from django.core.management.base import BaseCommand

from reading.models import Page


class Command(BaseCommand):
    def handle(self, *args, **options):
        for page in Page.objects.filter(image_url__contains='!_originals'):
            orig_url = page.image_url
            updated_url = orig_url.replace('/!_originals', '')
            page.image_url = updated_url
            page.save()
