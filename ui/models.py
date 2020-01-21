import datetime
from django.db import models
from tinymce.models import HTMLField
from django.conf import settings


class Slider(models.Model):
    subject = models.ForeignKey('reading.Category', on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Slider'
        verbose_name_plural = 'slides'

    def __str__(self):
        return str(self.subject.name)


class UserBookModel(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True)
    book = models.ForeignKey('reading.Book', on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)

    class Meta:
        abstract = True

    def __str__(self):
        return str(self.book)


class Review(UserBookModel):
    rating = models.IntegerField()
    review = models.TextField(blank=True, null=True)
    headline = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return str(self.book)


class Favorite(UserBookModel):
    pass


class Reading(UserBookModel):
    pass


class Borrow(UserBookModel):
    pass

    def return_book(self):
        self.book.num_copies += 1
        self.book.save()
        self.delete()

    def loan_expires(self):
        return self.created_at + datetime.timedelta(days=settings.LOAN_PERIOD)


class WaitingList(UserBookModel):
    pass


class CustomPage(models.Model):
    name = models.CharField(max_length=255)
    content = HTMLField(verbose_name=u'content')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Contact(models.Model):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    phone = models.CharField(max_length=255, blank=True, null=True)
    subject = models.CharField(max_length=255, blank=True, null=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Blog(models.Model):
    name = models.CharField(max_length=255)
    preview = models.ImageField(upload_to='blog/', blank=True, null=True)
    content = HTMLField(verbose_name=u'content')
    is_active = models.BooleanField(default=True)
    author = models.ForeignKey('users.User', blank=True, null=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def get_preview_image(self):
        if self.preview:
            return self.preview.url
        else:
            return '/static/img/theme/snac_logo.png'
