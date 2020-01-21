import os
import json
import datetime
import subprocess

from django.contrib.sites.models import Site
from django.db import models
from django.urls import reverse
from django.conf.global_settings import LANGUAGES
from django.utils import timezone
from django.conf import settings
from django.template.defaultfilters import slugify


class NameModel(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        abstract = True

    def __str__(self):
        return self.name


class Book(models.Model):

    BOOK = 1
    MAGAZINE = 2
    DOCUMENT = 3
    MANUSCRIPT = 4

    TYPE_CHOICES = (
        (BOOK, 'Book'),
        (MAGAZINE, 'Magazine'),
        (DOCUMENT, 'Document'),
        (MANUSCRIPT, 'Manuscript'),
    )

    AUDIO = 1
    VIDEO = 2
    TEXTS = 3
    SOFTWARE = 4
    MEDIA = 5

    COLLECTION_CHOICES = (
        (AUDIO, 'Community Audio'),
        (SOFTWARE, 'Community Software'),
        (TEXTS, 'Community Texts'),
        (VIDEO, 'Community Video'),
        (MEDIA, 'Community Media')
    )

    BLANK = 0
    NO_RIGHTS_RESERVED = 1
    CREATIVE_COMMONS = 2
    PUBLIC_DOMAIN = 3

    LICENCES_CHOICES = (
        (BLANK, 'Leave license blank'),
        (NO_RIGHTS_RESERVED, 'CC0 — "No Rights Reserved"'),
        (CREATIVE_COMMONS, 'Creative Commons'),
        (PUBLIC_DOMAIN, 'Public Domain')
    )

    SNAC_STAGING = 'snacstaging'
    SNAP_PDL = 'snappdl'

    BUCKET_CHOICES = (
        (SNAC_STAGING, 'Snac Staging'),
        (SNAP_PDL, 'Snap PDL'),
    )

    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    creator = models.ForeignKey('Creator', blank=True, null=True, on_delete=models.SET_NULL)
    contributor = models.ForeignKey('Contributor', blank=True, null=True, on_delete=models.SET_NULL)
    publisher = models.ForeignKey('Publisher', blank=True, null=True, on_delete=models.SET_NULL)
    reference = models.CharField(max_length=255, blank=True, null=True)
    published = models.CharField(max_length=255, blank=True, null=True)
    num_copies = models.IntegerField(default=1, help_text="Number of physical copies held by the library")
    pages = models.IntegerField(default=0)
    e_book = models.BooleanField(default=False)
    scanned = models.BooleanField(default=False)
    free_to_read = models.BooleanField(default=True)
    file = models.FileField(upload_to='book/', null=True, blank=True)
    cover = models.ImageField(upload_to='cover/', default=None, blank=True, null=True)
    book_type = models.IntegerField(choices=TYPE_CHOICES, blank=True, null=True)
    category = models.ForeignKey('Category', blank=True, null=True, on_delete=models.SET_NULL)
    ocr_processed = models.BooleanField(default=False)
    can_be_processed = models.BooleanField(default=True)
    fail_reason = models.TextField(blank=True, null=True, help_text="If OCR can't open/read/process file")

    tags = models.ManyToManyField('Tag', blank=True)
    collection = models.IntegerField(choices=COLLECTION_CHOICES, blank=True, null=True)
    test_item = models.BooleanField(default=False)
    language = models.CharField(max_length=7, choices=LANGUAGES, default='en')

    licence = models.IntegerField(choices=LICENCES_CHOICES, blank=True, null=True)
    allow_remixing = models.BooleanField(default=False)
    require_share_alike = models.BooleanField(default=False)
    prohibit_commercial_use = models.BooleanField(default=False)
    meta_data = models.ManyToManyField('MetaData', blank=True)

    panjub_db_link = models.CharField(max_length=255, blank=True, null=True)
    s3_bucket = models.CharField(max_length=255, choices=BUCKET_CHOICES, default=SNAC_STAGING)
    isbn = models.CharField(max_length=255, blank=True, null=True)
    condition = models.CharField(max_length=255, blank=True, null=True)
    script = models.CharField(max_length=255, blank=True, null=True)
    custodian = models.CharField(max_length=255, blank=True, null=True)
    digitization_sponsor = models.CharField(max_length=255, blank=True, null=True)
    s3_pdf_url = models.CharField(max_length=255, blank=True, null=True)
    s3_id = models.CharField(max_length=255, blank=True, null=True)

    user = models.ForeignKey('users.User', on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(force_insert, force_update, using, update_fields)

    def get_action_button(self):
        if self.page_set.count() > 0:
            if self.free_to_read:
                return "<a href='/book/read/{}' class='btn-u btn-u-sea btn-read cta-btn" \
                       " cta-btn--available'>Read</a>".format(self.slug)
            else:
                if self.num_copies > 0:
                    return "<a href='/borrow/{}' class='btn-u btn-u-sea cta-btn" \
                           " cta-btn--available'>Borrow</a>".format(self.slug)
                else:
                    return "<button type='submit' class='btn-u btn-u-sea cta-btn" \
                           " cta-btn--unavailable'>Join waitlist</button>"
        else:
            return "<button class='btn-u btn-u-sea cta-btn" \
                   " cta-btn--unavailable' disabled>Not available</button>"

    def get_cover(self):
        if self.cover:
            return self.cover.url
        else:
            return '/static/img/theme/nocover.png'

    def available_to_borrow(self):
        if self.num_copies > 0 and self.free_to_read:
            return True
        else:
            return False

    def test_period_expires(self):
        return self.created_at + datetime.timedelta(days=30)

    def get_read_url(self):
        return reverse("read_book", args=(self.slug, ))

    def get_facebook_share_url(self):
        return 'https://www.facebook.com/sharer/sharer.php?u=http://{}{}'.format(Site.objects.first().domain,
                                                                                 self.get_read_url())

    def get_twitter_share_url(self):
        return 'https://twitter.com/home?status=http://{}{}'.format(Site.objects.first().domain,
                                                                    self.get_read_url())

    def get_pinterest_share_url(self):
        return 'https://pinterest.com/pin/create/link/?url=http://{}{}'.format(Site.objects.first().domain,
                                                                               self.get_read_url())

    def get_pages_as_json(self):
        """
        [
          [
            { width: 800, height: 1200,
              uri: 'https://snacstaging.s3.ca-central-1.amazonaws.com/jpg/74/0-0.png' },
          ],
          [
            { width: 800, height: 1200,
              uri: 'https://snacstaging.s3.ca-central-1.amazonaws.com/jpg/74/0-1.png' },
            { width: 800, height: 1200,
              uri: 'https://snacstaging.s3.ca-central-1.amazonaws.com/jpg/74/0-1.png' },
          ],
        ]
        """
        result = []
        if self.s3_bucket == self.SNAC_STAGING:
            aws_url = str(self.file.url).split('/')
            aws_url.insert(3, 'jpg')
            aws_url.pop(4)  # removing 'book'
            aws_url.pop(4)  # removing 'book_name'
            aws_url = '/'.join(aws_url)
            for i in range(self.page_set.count()):
                uri = '{}/{}/0-{}.png'.format(aws_url, self.id, i)
                page = [{'width': 800, 'height': 1200, 'uri': uri}]
                result.append(page)
        else:
            for p in self.page_set.order_by('page_num'):
                uri = p.image_url
                page = [{'width': 800, 'height': 1200, 'uri': uri}]
                result.append(page)

        return json.dumps(result)

    class Meta:
        ordering = ['-id']


class MetaData(models.Model):
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=255)

    def __str__(self):
        return '{}: {}'.format(self.key, self.value)


class Tag(NameModel):
    pass


class Creator(NameModel):
    pass


class Contributor(NameModel):
    pass


class Publisher(NameModel):
    pass


class Category(NameModel):
    icon = models.ImageField(upload_to='categories_icons/', blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Categories'

    def get_icon(self):
        if self.icon:
            return self.icon.url
        else:
            return '/static/img/theme/history.svg'

    def get_book_count(self):
        return self.book_set.count()


class Page(models.Model):
    book = models.ForeignKey('Book', on_delete=models.CASCADE)
    page_num = models.IntegerField()
    text = models.TextField()
    file = models.FileField(upload_to='jpg/', blank=True, null=True)
    image_url = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return str(self.book)


class Return(models.Model):
    """ Simple model to filter books by Recently Returned''"""
    book = models.ForeignKey('reading.Book', on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return str(self.book.name)
