import boto3
import os
import win32api

from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import F, Avg
from django.shortcuts import render, redirect
from django.views.generic import DetailView, ListView, FormView, TemplateView
from django.contrib import messages
from django.core import serializers
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from el_pagination.views import AjaxListView

from .models import Book, Category, Return, Tag, MetaData, Creator
from .forms import AddBookForm
from ui.models import Review, Favorite, Reading, WaitingList, Borrow
from .tasks import process_manually_added_book
from core.settings import DOWNLOAD_TEXT_DIR, DOWNLOAD_JSON_DIR, AWS_OCR_STORAGE_BUCKET, OCR_OBJECT, \
    AWS_S3_ACCESS_KEY_ID, AWS_S3_SECRET_ACCESS_KEY
from utils import file_manager, json_manager
from utils.text_anaylsis import TextAnalysis


text_analysis = TextAnalysis()
# s3 = boto3.resource('s3', aws_access_key_id=AWS_S3_ACCESS_KEY_ID, aws_secret_access_key=AWS_S3_SECRET_ACCESS_KEY)
s3 = boto3.client('s3', aws_access_key_id=AWS_S3_ACCESS_KEY_ID, aws_secret_access_key=AWS_S3_SECRET_ACCESS_KEY)


class BookDetail(DetailView):
    model = Book
    context_object_name = 'book'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        book = self.get_object()
        show_read_button = False
        if book.free_to_read:
            show_read_button = True
        else:
            if self.request.user.is_authenticated:
                book_is_borrowed = Borrow.objects.filter(user=self.request.user, book=book).exists()
                if book_is_borrowed:
                    show_read_button = True

        if not book.file:
            show_read_button = False

        context['show_read_button'] = show_read_button
        if self.request.user.is_authenticated:
            context['user_can_write_a_review'] = not Review.objects.filter(user=self.request.user, book=book).exists()
            context['book_in_favorites'] = Favorite.objects.filter(user=self.request.user, book=book).exists()
            context['book_in_waitlist'] = WaitingList.objects.filter(user=self.request.user, book=book).exists()
            context['book_is_borrowed'] = Borrow.objects.filter(user=self.request.user, book=book).exists()
        else:
            context['user_can_write_a_review'] = False
            context['book_in_favorites'] = False
            context['book_in_waitlist'] = False
            context['book_is_borrowed'] = False
        reviews = Review.objects.filter(book=book)
        context['reviews'] = reviews
        if reviews:
            avg_rating = Review.objects.filter(book=book).values('rating').aggregate(total=Avg(F('rating')))['total']
            context['rating'] = avg_rating
            context['stars'] = round(avg_rating)
        if book.category:
            context['related'] = Book.objects.filter(category=book.category).exclude(id=book.id)[:10]
        context['book'] = book
        context['book_json'] = serializers.serialize('json', [context['book']])[1:-2]
        return context


class ReadBook(DetailView):
    model = Book
    context_object_name = 'book'
    template_name = 'reading/read_book.html'

    def dispatch(self, request, *args, **kwargs):
        if self.request.user.is_authenticated:
            if not Reading.objects.filter(user=self.request.user, book=self.get_object()).exists():
                try:
                    Reading.objects.create(user=self.request.user, book=self.get_object())
                except Exception as e:
                    print(f'Strange exception after db dump: {e}')
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        print(kwargs)
        context = super().get_context_data(**kwargs)
        book = self.get_object()
        context['related'] = Book.objects.filter(category=book.category).exclude(id=book.id)[:10]
        prev_url = self.request.META.get('HTTP_REFERER')
        prev_page_title = 'book details'
        if prev_url and 'search' in prev_url:
            prev_page_title = 'search results'
        context['prev_page'] = prev_url
        context['prev_page_title'] = prev_page_title

        return context


class BookList(AjaxListView):
    context_object_name = "object_list"
    template_name = 'reading/book_list.html'
    page_template = 'reading/book_list_page.html'
    model = Book


class AddBookView(LoginRequiredMixin, TemplateView):
    template_name = 'reading/add_book.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['form'] = AddBookForm
        return context


@login_required
def save_book(request):
    if request.method == 'POST':
        name = request.POST.get('book_title')
        content = request.POST.get('description')
        tags = request.POST.getlist('tags')
        creator = request.POST.get('creator')
        published = request.POST.get('published')
        collection = request.POST.get('collection')
        test_item = request.POST.get('test_item')
        language = request.POST.get('language')
        licence = request.POST.get('licence')
        meta_key = request.POST.getlist('meta_key')
        meta_value = request.POST.getlist('meta_value')
        category = request.POST.get('category')
        file = request.FILES.get('file')

        file_extension = str(file).split('.')[1]
        if file_extension != 'pdf':
            messages.add_message(request, messages.ERROR, 'Please upload only PDF file')
            return redirect('add_book')

        fail_reason = ''
        if test_item == '1':
            can_be_processed = False
            fail_reason = "It's a test Item"
        else:
            can_be_processed = True

        # try:
        book = Book.objects.create(name=name,
                                   content=content,
                                   published=published,
                                   collection=int(collection),
                                   test_item=test_item,
                                   language=language,
                                   licence=int(licence) if licence else 0,
                                   can_be_processed=can_be_processed,
                                   fail_reason=fail_reason,
                                   file=file)
        if creator:
            creator_obj, _ = Creator.objects.get_or_create(name=creator)
            book.creator = creator_obj
        if category:
            book.category_id = category
        for t in tags[0].split(','):
            tag, _ = Tag.objects.get_or_create(name=t)
            book.tags.add(tag)

        if all([meta_key, meta_value]):
            for i, k in enumerate(meta_key):
                book.meta_data.add(MetaData.objects.create(key=k, value=meta_value[i]))
        book.save()
        messages.add_message(request, messages.SUCCESS, 'Book has been added to our library. Please wait '
                                                        'for few minutes so we can process all pages.'
                                                        'Read button will be available soon.')
        process_manually_added_book.delay(book.id)
        return redirect('book_detail', book.slug)
        # except Exception as e:
        #     messages.add_message(request, messages.ERROR, str(e))
        #     return redirect('add_book')


class MagazineList(BookList):
    def get_queryset(self):
        return Book.objects.filter(book_type=Book.MAGAZINE)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['name'] = 'Magazines'
        return context


class BorrowedList(BookList):
    template_name = 'reading/borrowed.html'

    def get_queryset(self):
        return Book.objects.filter(num_copies__gte=1, free_to_read=False)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['name'] = 'You can borrow'
        return context


class EbooksList(BookList):
    def get_queryset(self):
        reading_ids = list(Reading.objects.all().values_list('book_id', flat=True))
        return Book.objects.filter(id__in=reading_ids)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['name'] = 'Recently added books'
        return context


class DocumentList(BookList):
    def get_queryset(self):
        return Book.objects.filter(book_type=Book.DOCUMENT)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['name'] = 'Documents'
        return context


class ManuscriptsList(BookList):
    def get_queryset(self):
        return Book.objects.filter(book_type=Book.MANUSCRIPT)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['name'] = 'Manuscripts'
        return context


class ReturnedBooksList(BookList):
    def get_queryset(self):
        return Book.objects.filter(id__in=list(Return.objects.order_by('-created_at')
                                               .values_list('book_id', flat=True)))

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['name'] = 'Returned book'
        return context


class BooksByTagList(ListView):
    model = Tag
    paginate_by = 18
    template_name = 'reading/book_list.html'

    def get_queryset(self):
        queryset = super().get_queryset()
        tag = Tag.objects.get(id=self.kwargs['pk'])
        queryset = tag.book_set.all()
        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        tag = Tag.objects.get(id=self.kwargs['pk'])
        context['name'] = f'Books by {tag.name}'
        return context


class CategoryList(ListView):
    model = Category
    paginate_by = 10


class CategoryDetailView(DetailView):
    model = Category
    paginate_by = 18
    template_name = 'reading/book_list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['object_list'] = Book.objects.filter(category_id=self.kwargs.get('pk'))
        return context


@login_required
def my_reading(request):
    return render(request, 'reading/my_books.html',
                  {'books': request.user.reading_set.all(), 'title': 'My Reading Log'})


@login_required
def my_loans(request):
    return render(request, 'reading/my_books.html',
                  {'books': request.user.borrow_set.all(), 'title': "Books You've Checked Out", 'loans': True})


@csrf_exempt
def search_word(request):

    data = {
        "indexed": True,
        "matches": []
    }

    word = request.POST.get('search_word', '')
    current_doc = request.POST.get('current_file', '')

    file_manager.create_directory_if_not_exists(DOWNLOAD_JSON_DIR)
    file_manager.create_directory_if_not_exists(DOWNLOAD_TEXT_DIR)
    file_manager.delete_files_in_folder(DOWNLOAD_JSON_DIR)
    file_manager.delete_files_in_folder(DOWNLOAD_TEXT_DIR)

    json_object_name = OCR_OBJECT + current_doc + "/json/"
    txt_object_name = OCR_OBJECT + current_doc + "/text/"
    download_files_from_s3(obj_name=json_object_name, dest_dir=DOWNLOAD_JSON_DIR)
    download_files_from_s3(obj_name=txt_object_name, dest_dir=DOWNLOAD_TEXT_DIR)

    word_page_number, word_location = json_manager.extract_pages_from_word(word=word)
    search_sentences = extract_sentences_with_search_word(page_number=word_page_number, srh_word=word)

    for page_num in search_sentences:

        box_index = 0
        for sentence_array in search_sentences[page_num]:

            main_tmp_dict = {"text": sentence_array[0], "par": []}
            sub_tmp_dict = {"boxes": [], "page": page_num - 1}

            for i in range(box_index, box_index + sentence_array[1]):
                sub_tmp_dict["boxes"].append(word_location[page_num][i])

            main_tmp_dict["par"].append(sub_tmp_dict)
            data["matches"].append(main_tmp_dict)
            box_index += sentence_array[1]

    return JsonResponse(data)


def extract_sentences_with_search_word(page_number, srh_word):

    sentences = {}
    for page in page_number:
        sentences[page] = text_analysis.get_sentence_per_page(page_num=page, srh_word=srh_word)

    return sentences


def download_files_from_s3(obj_name, dest_dir):

    object_listing = s3.list_objects_v2(Bucket=AWS_OCR_STORAGE_BUCKET,
                                        Prefix=obj_name)

    for obj in object_listing['Contents'][1:]:

        path, filename = os.path.split(obj["Key"])
        file_path = os.path.join(dest_dir, filename)
        s3.download_file(AWS_OCR_STORAGE_BUCKET, obj["Key"], file_path)

    return
