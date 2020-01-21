import json
import os

from django.contrib.auth.decorators import login_required
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Q
from django.http import JsonResponse, HttpResponse, Http404
from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import DetailView, ListView, TemplateView, CreateView
from django.conf import settings
from django.contrib import messages
from django.contrib.messages.views import SuccessMessageMixin
# from haystack.views import SearchView
from haystack.generic_views import SearchView

from reading.models import Book, Category, Return, Page
from .models import Slider, Review, Favorite, Borrow, CustomPage, Blog, WaitingList, Reading
from .forms import ContactForm


class HomePage(ListView):
    model = Book
    template_name = 'ui/homepage.html'
    paginate_by = 10

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(object_list=object_list, **kwargs)
        context['categories'] = Category.objects.all()
        context['manuscripts'] = Book.objects.filter(book_type=Book.MANUSCRIPT)[:20]
        reading_ids = list(Reading.objects.all().values_list('book_id', flat=True))
        context['recent'] = Book.objects.filter(id__in=reading_ids)
        context['to_borrow'] = Book.objects.filter(num_copies__gte=1, free_to_read=False)[:20]
        context['returned'] = Book.objects.filter(id__in=list(Return.objects.order_by('-created_at')
                                                              .values_list('book_id', flat=True)))[:10]
        context['blogs'] = Blog.objects.filter(is_active=True)[:3]
        context['books'] = Book.objects.filter(free_to_read=True, book_type=Book.BOOK)[:20]
        context['slides'] = Slider.objects.filter(is_active=True)
        return context


@login_required
def add_review(request, pk):
    book = Book.objects.get(pk=pk)
    if request.method == 'POST':
        rating = request.POST.get('star')
        review = request.POST.get('review_text')
        headline = request.POST.get('headline')
        messages.add_message(request, messages.SUCCESS, 'Your review is added. Thank you!')
        Review.objects.create(user=request.user, headline=headline, review=review, rating=rating, book=book)
        return redirect('book_detail', slug=book.slug)


@login_required
def add_favorite(request, pk):
    book = Book.objects.get(pk=pk)
    Favorite.objects.create(book=book, user=request.user)
    messages.add_message(request, messages.SUCCESS, 'Book is added to your favorites')
    return redirect('book_detail', slug=book.slug)


@login_required
def borrow_book(request, pk):
    book = Book.objects.get(pk=pk)
    if book.num_copies > 0:
        user = request.user
        if Borrow.objects.filter(book=book, user=user).exists():
            messages.add_message(request, messages.WARNING, "You are already borrowed that book")
            return redirect('book_detail', pk=pk)
        if user.borrow_set.count() >= 5:
            messages.add_message(request, messages.ERROR, "You've reached your limit in 5 borrowed books. "
                                                          "Please return one of your books")
            return redirect('book_detail', pk=pk)
        Borrow.objects.create(book=book, user=user)
        book.num_copies -= 1
        book.save()
    else:
        messages.add_message(request, messages.ERROR, "We don't have available copy in stock")

    return redirect('book_detail', slug=book.slug)


@login_required
def add_to_waiting_list(request, pk):
    book = Book.objects.get(pk=pk)
    if request.method == 'POST':
        if not WaitingList.objects.filter(book=book, user=request.user).exists():
            WaitingList.objects.create(book=book, user=request.user)
            messages.add_message(request, messages.SUCCESS, 'You are added to the waiting list')
        else:
            messages.add_message(request, messages.WARNING, 'You are already in waiting list')
        return redirect('book_detail', slug=book.slug)


def _release_book_from_waiting_list(book):
    if WaitingList.objects.filter(book=book).exists():
        first_in_line = WaitingList.objects.filter(book=book).first()
        Borrow.objects.create(user=first_in_line.user, book=book)
        book.num_copies -= 1
        book.save()
        # Notify user somehow
        first_in_line.delete()


def return_book(request, pk):
    book = Book.objects.get(pk=pk)
    if request.method == 'POST':
        if Borrow.objects.filter(user=request.user, book=book).exists():
            loan = Borrow.objects.get(user=request.user, book=book)
            loan.return_book()
            _release_book_from_waiting_list(book)
        if book.num_copies > 0:
            Return.objects.create(book=book)
        messages.add_message(request, messages.SUCCESS, 'Book is successfully returned')
        return redirect('my_loans')


class CustomPageDetail(DetailView):
    model = CustomPage


class ContactView(SuccessMessageMixin, CreateView):
    form_class = ContactForm
    template_name = 'ui/contact_form.html'
    success_url = 'success'
    success_message = 'Message sent'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['google_key'] = settings.GOGLE_MAPS_API_KEY
        return context


class ContactSuccessView(TemplateView):
    template_name = 'ui/contact_success.html'


class BlogList(ListView):
    model = Blog
    paginate_by = 10

    def get_queryset(self):
        return Blog.objects.filter(is_active=True)


class BlogDetail(DetailView):
    model = Blog
    context_object_name = 'blog'


class QuickSearch(ListView):
    template_name = 'search/by_titles.html'
    paginate_by = 10
    model = Book

    def get_queryset(self):
        queryset = super().get_queryset()
        query = self.request.GET.get('q')
        if query:
            queryset = Book.objects.filter(Q(name__icontains=query) | Q(content__icontains=query)\
                                           | Q(creator__name__icontains=query)\
                                           | Q(contributor__name__icontains=query))
        return queryset

    def get_context_data(self, *, object_list=None, **kwargs):
        query = self.request.GET.get('q')
        context = super().get_context_data(object_list=self.get_queryset(), **kwargs)
        context['query'] = query
        context['object_list'] = self.get_queryset()
        return context


def prefetch_search(request):
    if request.method == 'POST':
        query = request.POST.get('q')
        if len(query) >= 2:
            queryset = Book.objects.filter(Q(name__icontains=query) | Q(content__icontains=query)\
                                           | Q(creator__name__icontains=query)\
                                           | Q(contributor__name__icontains=query))\
                .values('name', 'creator__name', 'id', 'slug')

            serialized_q = json.dumps(list(queryset), cls=DjangoJSONEncoder)
            unserialized__dict = json.loads(serialized_q)
            for i in unserialized__dict:
                book = Book.objects.get(id=i['id'])
                i['cover'] = book.get_cover()
            final_result = json.dumps(unserialized__dict, cls=DjangoJSONEncoder)

            return HttpResponse(final_result)

        return JsonResponse({'data': ''})
    else:
        return JsonResponse({'data': 'its a get'})


def serve_jpg(pathname):
    """ Return the jpg image in a response """
    if os.path.exists(pathname):
        with open(pathname, 'rb') as f:
            response = HttpResponse(f.read())
            response['Content-Disposition'] = 'inline;filename={0}'.format(os.path.basename(pathname))
            return response
    else:
        raise Http404


class BookPageView(DetailView):
    model = Page

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['book'] = context['bookpage'].book
        return context


class ExtendedSearchView(SearchView):

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(object_list=object_list, **kwargs)
        query = self.request.GET.get('q')
        if query:
            title_search_results = Book.objects.filter(Q(name__icontains=query) | Q(content__icontains=query)
                                           | Q(creator__name__icontains=query) | Q(contributor__name__icontains=query))
        else:
            title_search_results = None
        context['title_search_results'] = title_search_results
        return context
