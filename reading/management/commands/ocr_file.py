from wand.image import Image
import PyPDF2
from django.conf import settings
from django.core.management.base import BaseCommand
import boto3
import subprocess


class Command(BaseCommand):

    def handle(self, *args, **options):
        book_file = 'reading/management/commands/0003525.pdf'

        def get_cover():
            with Image(filename=book_file + '[0]') as img:
                    img.save(filename='tmp_covers/page.png')

        def get_cover2():
            subprocess.call(['convert', book_file+'[0]', 'tmp_covers/page.png'])







        # book_file = 'reading/management/commands/example.pdf'
        # pdf_file = open(book_file, 'rb')
        # read_pdf = PyPDF2.PdfFileReader(pdf_file)
        # number_of_pages = int(read_pdf.getNumPages())
        # print('number_of_pages', number_of_pages)
        #
        # if number_of_pages > 0:
        #     for i in range(number_of_pages):
        #         page = read_pdf.getPage(i)
        #         page_content = page.extractText()
        #         print(page_content, end='\n\n')

        # get_cover()
        get_cover2()

        # file_to_upload = open('page.png', 'rb')
        # path_on_s3 = 'cover/' + file_to_upload.name
        #
        # session = boto3.session.Session(aws_access_key_id=settings.AWS_S3_ACCESS_KEY_ID,
        #                                 aws_secret_access_key=settings.AWS_S3_SECRET_ACCESS_KEY)
        # s3 = session.resource('s3')
        # s3.Bucket(settings.AWS_STORAGE_BUCKET_NAME).put_object(Key=path_on_s3, Body=file_to_upload)
