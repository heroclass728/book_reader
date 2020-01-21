"""
celery -A core.celery worker -l critical --beat
"""
import os
import re

import datetime
import boto3
import requests
import subprocess
import shutil
import urllib.request
import pyocr
import pyocr.builders

from pathlib import Path
from PIL import Image

from PyPDF2 import PdfFileReader
from django.conf import settings
from django.core.management import call_command
from celery.task import periodic_task, task
from datetime import timedelta


from ui.views import _release_book_from_waiting_list
from .models import Book, Page
from ui.models import Borrow


def clean_tmp_folder():
    folder = '{}/tmp_pdf/'.format(settings.ROOT_DIR)
    for f in [os.path.join(folder, f) for f in os.listdir(folder)]:
        os.remove(f)
    folder_with_pics = '{}/tmp_covers/'.format(settings.ROOT_DIR)
    for p in [os.path.join(folder_with_pics, f) for f in os.listdir(folder_with_pics)]:
        os.remove(p)
    folder_with_pages = '{}/tmp_jpg/'.format(settings.ROOT_DIR)
    for p in [os.path.join(folder_with_pages, f) for f in os.listdir(folder_with_pages)]:
        os.remove(p)


def get_jpg_path(book):
    folder_path = '{}/tmp_jpg/{}/'.format(settings.ROOT_DIR, book.id)
    folder = Path(folder_path)
    if not folder.is_dir():
        os.makedirs(folder_path)
    return folder_path


def get_or_create_tmp_file_from_s3_url(book):
    url = book.file.url
    tmp_file = '{}/tmp_pdf/{}.pdf'.format(settings.ROOT_DIR, book.id)
    req = requests.get(url)
    file_exists = Path(tmp_file)
    if file_exists.is_file():
        return tmp_file
    else:
        file = open(tmp_file, 'wb')
        for chunk in req.iter_content(100000):
            file.write(chunk)
        file.close()
        return tmp_file


def get_pdf_content(book, pages):
    """ Not in use """
    pdf_file = get_or_create_tmp_file_from_s3_url(book)
    pdf = PdfFileReader(pdf_file)
    for i in range(0, pages):
        page, created = Page.objects.get_or_create(book=book, page_num=i)
        if created:
            content = pdf.getPage(i).extractText() + "\n"
            splitted = re.findall('[A-Z][^A-Z]*', content)
            content = ' '.join(splitted)
            try:
                cleaned_content = " ".join(content.replace("\xa0", " ").strip().split())
            except UnicodeEncodeError:
                cleaned_content = content
            page.text = cleaned_content
            page.save()
    book.ocr_processed = True
    book.pages = pages
    book.scanned = True
    book.save()


def count_pages_by_num_of_jpg(book):
    jpg_dir = get_jpg_path(book)
    number_of_jpg_in_dir = len([name for name in os.listdir(jpg_dir) if os.path.isfile(os.path.join(jpg_dir, name))])
    if number_of_jpg_in_dir > 0:
        book.pages = number_of_jpg_in_dir
        book.save()
    return number_of_jpg_in_dir


def get_cover(book, book_file):
    # todo: check if desired page num as cover exists.
    try:
        if not book.cover:
            subprocess.call(['convert', book_file + '[0]', '-resize', '180x260',  'tmp_covers/{}.png'.format(book.id)])
            book.cover = 'cover/{}.png'.format(book.id)
            book.save()
            upload_cover_to_s3(book)
    except Exception as e:
        book.fail_reason += 'Error get_cover: {} with {} \n\n'.format(str(e), book.name)
        book.save()


def upload_cover_to_s3(book):
    try:
        file_to_upload = open('tmp_covers/{}.png'.format(book.id), 'rb')
        path_on_s3 = 'cover/{}.png'.format(book.id)
        session = boto3.session.Session(aws_access_key_id=settings.AWS_S3_ACCESS_KEY_ID,
                                        aws_secret_access_key=settings.AWS_S3_SECRET_ACCESS_KEY)
        s3 = session.resource('s3')
        s3.Bucket(settings.AWS_STORAGE_BUCKET_NAME).put_object(Key=path_on_s3, Body=file_to_upload)
    except Exception as e:
        book.fail_reason += 'Error upload_cover_to_s3: {} with {} \n\n'.format(str(e), book.name)
        book.save()


def upload_pages_to_s3(book):
    try:
        for file_name in os.listdir(get_jpg_path(book)):
            path_on_s3 = 'jpg/{}/{}'.format(book.id, file_name)
            file_to_upload = open('tmp_jpg/{}/{}'.format(book.id, file_name), 'rb')
            session = boto3.session.Session(aws_access_key_id=settings.AWS_S3_ACCESS_KEY_ID,
                                            aws_secret_access_key=settings.AWS_S3_SECRET_ACCESS_KEY)
            s3 = session.resource('s3')
            s3.Bucket(settings.AWS_STORAGE_BUCKET_NAME).put_object(Key=path_on_s3, Body=file_to_upload)
    except Exception as e:
        book.fail_reason += 'Error upload_cover_to_s3: {} with {} \n\n'.format(str(e), book.name)
        book.save()


def update_search_index():
    call_command('update_index')


def convert_pdf_to_png(book):
    book_file = get_or_create_tmp_file_from_s3_url(book)
    jpg_path = get_jpg_path(book)
    subprocess.call(['convert', book_file, os.path.join(jpg_path, '0.png')])


def clear_tmp_folder(book_id=None):
    folder_with_pics = '{}/tmp_jpg/'.format(settings.ROOT_DIR)
    if book_id:
        folder_with_pics = f'{settings.ROOT_DIR}/tmp_jpg/{book_id}'
    print(f"+ [clean]: {len(os.listdir(folder_with_pics))}, end='\n\n'")
    for p in [os.path.join(folder_with_pics, f) for f in os.listdir(folder_with_pics)]:
        os.remove(p)


def save_images_locally(book):
    if not book.ocr_processed:
        print(f"+ [images]: {book.page_set.filter(image_url__isnull=False).count()}")
        for page in book.page_set.filter(image_url__isnull=False):
            target_file = f'tmp_jpg/{page.page_num}.jpg'
            with urllib.request.urlopen(page.image_url) as response, open(target_file, 'wb') as out_file:
                shutil.copyfileobj(response, out_file)


def ocr_images(book, manually_added=False):

    if manually_added:
        print(f"+ [ocr]: {len(os.listdir(f'{settings.ROOT_DIR}/tmp_jpg/{book.id}/'))}")
        for image in os.listdir(f'{settings.ROOT_DIR}/tmp_jpg/{book.id}/'):
            page = book.page_set.get(page_num=image.split('.')[0].split('-')[1])
            image_path = f'{settings.ROOT_DIR}/tmp_jpg/{book.id}/{image}'
            tools = pyocr.get_available_tools()[0]
            page.text = tools.image_to_string(Image.open(image_path))
            page.save()
    else:
        print(f"+ [ocr]: {len(os.listdir(f'{settings.ROOT_DIR}/tmp_jpg/'))}")
        for image in os.listdir(f'{settings.ROOT_DIR}/tmp_jpg/'):
            page = book.page_set.get(page_num=image.split('.')[0])
            image_path = f'{settings.ROOT_DIR}/tmp_jpg/{image}'
            tools = pyocr.get_available_tools()[0]
            page.text = tools.image_to_string(Image.open(image_path))
            page.save()
    book.ocr_processed = True
    book.save()
    if manually_added:
        clear_tmp_folder(book.id)
    else:
        clear_tmp_folder()


def process_books():
    book_num = Book.objects.filter(ocr_processed=False, can_be_processed=True, language='en',
                                   s3_id__isnull=False).count()
    print(f'Book to process: {book_num}')
    for book in Book.objects.filter(ocr_processed=False, can_be_processed=True, language='en',
                                    s3_id__isnull=False):
        print(f'book: {book}')
        save_images_locally(book)
        ocr_images(book)


def process_waiting_list():
    """ Release book from borrow after loan_expires date. And assigning a book to first in line of WaitingList """
    for borrow in Borrow.objects.all():
        if datetime.datetime.now().date() > borrow.loan_expires():
            book = borrow.book
            borrow.return_book()
            _release_book_from_waiting_list(book)


def process_test_items():
    for book in Book.objects.filter(test_item=True):
        if datetime.datetime.now().date() > book.test_period_expires():
            book.delete()


@periodic_task(run_every=timedelta(seconds=30))
def check_for_unprocessed_books():
    process_books()


@periodic_task(run_every=timedelta(minutes=5))
def update_search_index_for_books():
    update_search_index()


@periodic_task(run_every=timedelta(days=1))
def check_for_waiting_list():
    process_waiting_list()


@periodic_task(run_every=timedelta(days=2))
def check_for_test_items():
    process_test_items()


@task
def process_manually_added_book(book_id):
    book = Book.objects.get(id=book_id)
    print(f'book: {book}')
    convert_pdf_to_png(book)
    book.pages = count_pages_by_num_of_jpg(book)
    book.save()
    upload_pages_to_s3(book)

    for p in range(0, book.pages):
        image_url = f'https://snacstaging.s3.ca-central-1.amazonaws.com/jpg/{book.id}/0-{p}.png'
        Page.objects.create(image_url=image_url, book=book, page_num=p)

    ocr_images(book, True)
