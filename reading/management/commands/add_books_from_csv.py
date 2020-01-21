import os
import csv
import urllib.request
import shutil
import boto3

from django.core.management.base import BaseCommand
from django.conf import settings

from reading.models import Book, Creator, Contributor, Publisher, Tag, Page


class Command(BaseCommand):
    help = 'Filling db with books from csv'

    def add_arguments(self, parser):
        parser.add_argument('manuscripts', nargs='*', type=str)

    def handle(self, *args, **options):

        manuscripts = options['manuscripts']

        def clear_tmp_folder():
            folder_with_pics = '{}/tmp_covers/'.format(settings.ROOT_DIR)
            for p in [os.path.join(folder_with_pics, f) for f in os.listdir(folder_with_pics)]:
                os.remove(p)

        def save_and_upload_cover(book, url):
            if settings.PRODUCTION:
                book_id = book.id
            else:
                book_id = f'dev_{book.id}'
            if not book.cover:
                target_file = f'tmp_covers/{book_id}.jpg'
                with urllib.request.urlopen(url) as response, open(target_file, 'wb') as out_file:
                    shutil.copyfileobj(response, out_file)
                try:
                    file_to_upload = open(target_file, 'rb')
                    path_on_s3 = 'cover/{}.jpg'.format(book_id)
                    session = boto3.session.Session(aws_access_key_id=settings.AWS_S3_ACCESS_KEY_ID,
                                                    aws_secret_access_key=settings.AWS_S3_SECRET_ACCESS_KEY)
                    s3 = session.resource('s3')
                    s3.Bucket(settings.AWS_STORAGE_BUCKET_NAME).put_object(Key=path_on_s3, Body=file_to_upload)
                    book.cover = f'cover/{book_id}.jpg'
                    book.save()
                except Exception as e:
                    book.fail_reason = 'Error save_and_upload_cover: {} with {} \n\n'.format(str(e), book.name)
                    book.save()
                clear_tmp_folder()

        def find_jpgs_for_book(book):
            if not book.page_set.all():
                folder_id = book.s3_id
                client = boto3.client('s3', aws_access_key_id=settings.AWS_S3_ACCESS_KEY_ID,
                                      aws_secret_access_key=settings.AWS_S3_SECRET_ACCESS_KEY)

                response = client.list_objects(Bucket=Book.SNAP_PDL, Prefix=f'images/{folder_id}')
                for i, c in enumerate(response.get('Contents', []), start=1):
                    file = c.get('Key')
                    if file.split('/')[-2] == folder_id:
                        image_from_s3 = f'https://snappdl.s3.ca-central-1.amazonaws.com/{file}'
                        Page.objects.create(page_num=i, image_url=image_from_s3, book=book, text=' ')

        def get_language_code(language):
            if language == 'English':
                return 'en'
            elif language == 'Hindi':
                return 'hi'
            elif language == 'Urdu':
                return 'ur'
            elif language == 'Panjabi':
                return 'pa'
            elif language == 'Persian':
                return 'fa'
            else:
                return ''
        if manuscripts:
            file_csv = 'manuscripts.csv'
            book_type = Book.MANUSCRIPT
        else:
            file_csv = 'books.csv'
            book_type = Book.BOOK
        print(f'file_csv: {file_csv}')
        with open(file_csv) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            line_count = 0
            for row in csv_reader:
                if line_count == 0:
                    line_count += 1
                else:
                    name = row[1]
                    print(f'name: {name}')
                    panjub_db_link = row[3]
                    preview_icon = row[4]
                    pages = row[5]
                    s3_pdf_url = row[6]
                    s3_id = s3_pdf_url.split('/')[-1].split('.')[0]
                    content = row[7]
                    tags = row[8]
                    publisher, _ = Publisher.objects.get_or_create(name=row[10])
                    isbn = row[11]
                    condition = row[12]
                    creator, _ = Creator.objects.get_or_create(name=row[13])
                    language = row[14]
                    published = row[15]
                    script = row[16]
                    custodian = row[17]
                    digitization_sponsor = row[18]
                    contributor, _ = Contributor.objects.get_or_create(name=digitization_sponsor)

                    if not Book.objects.filter(name=name).exists():
                        book = Book.objects.create(name=name, book_type=book_type,
                                                   panjub_db_link=panjub_db_link,
                                                   pages=pages,
                                                   s3_pdf_url=s3_pdf_url,
                                                   s3_id=s3_id,
                                                   content=content,
                                                   publisher=publisher,
                                                   isbn=isbn,
                                                   condition=condition,
                                                   creator=creator,
                                                   published=published,
                                                   script=script,
                                                   custodian=custodian,
                                                   digitization_sponsor=digitization_sponsor,
                                                   contributor=contributor,
                                                   language=get_language_code(language),
                                                   s3_bucket=Book.SNAP_PDL
                                                   )

                        for t in tags.split(','):
                            tag, _ = Tag.objects.get_or_create(name=t)
                            book.tags.add(tag)

                        save_and_upload_cover(book, preview_icon)
                        find_jpgs_for_book(book)

                    line_count += 1
            print(f'Processed {line_count} lines.')

