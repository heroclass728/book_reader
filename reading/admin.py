from django.contrib import admin

from .models import Book, Contributor, Creator, Category, Page, Return, Tag, MetaData, Publisher


class BookAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_filter = ['language', 'book_type', 'ocr_processed']
    list_display = ['name', 'pages', 'book_type', 'ocr_processed', 'can_be_processed']
    raw_id_fields = ['creator', 'publisher']
    # readonly_fields = ['ocr_processed', 'can_be_processed', 'fail_reason']


class PageAdmin(admin.ModelAdmin):
    raw_id_fields = ['book', ]
    list_filter = ['book', ]
    search_fields = ['book__name']
    list_display = ['book', 'page_num']


admin.site.register(Book, BookAdmin)
admin.site.register(Contributor)
admin.site.register(Creator)
admin.site.register(Publisher)
admin.site.register(Category)
admin.site.register(Page, PageAdmin)
admin.site.register(Return)
admin.site.register(Tag)
admin.site.register(MetaData)
