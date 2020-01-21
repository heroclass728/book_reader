import os
import shutil
import urllib.request

from django.core.management.base import BaseCommand
from django.conf import settings
from reading.models import Book

from PIL import Image

import pyocr
import pyocr.builders


class Command(BaseCommand):
    help = 'Getting text from images'

    def handle(self, *args, **options):
        book_num = Book.objects.filter(ocr_processed=False, can_be_processed=True, language='en').count()
        print(f'Book to process: {book_num}')

        def clear_tmp_folder():
            folder_with_pics = '{}/tmp_covers/'.format(settings.ROOT_DIR)
            print(f"+ [clean]: {len(os.listdir(folder_with_pics))}', end='\n\n'")
            for p in [os.path.join(folder_with_pics, f) for f in os.listdir(folder_with_pics)]:
                os.remove(p)

        def save_images_locally(book):
            if not book.ocr_processed:
                print(f"+ [images]: {book.page_set.filter(image_url__isnull=False).count()}")
                for page in book.page_set.filter(image_url__isnull=False):
                    target_file = f'tmp_jpg/{page.page_num}.jpg'
                    with urllib.request.urlopen(page.image_url) as response, open(target_file, 'wb') as out_file:
                        shutil.copyfileobj(response, out_file)

        def ocr_images(book):
            print(f"+ [ocr]: {len(os.listdir(f'{settings.ROOT_DIR}/tmp_jpg/'))}")
            for image in os.listdir(f'{settings.ROOT_DIR}/tmp_jpg/'):
                page = book.page_set.get(page_num=image.split('.')[0])
                image_path = f'{settings.ROOT_DIR}/tmp_jpg/{image}'
                tools = pyocr.get_available_tools()
                page.text = tools.image_to_string(Image.open(image_path))
                page.save()
            book.ocr_processed = True
            book.save()
            clear_tmp_folder()

        for book in Book.objects.filter(ocr_processed=False, can_be_processed=True, language='en'):
            print(f'book: {book}')
            save_images_locally(book)
            ocr_images(book)
