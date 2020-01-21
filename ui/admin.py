from django.contrib import admin

from .models import Slider, Review, Favorite, Reading, Borrow, CustomPage, Contact, Blog, WaitingList


class BorrowAdmin(admin.ModelAdmin):
    list_display = ['book', 'user', 'loan_expires']


admin.site.register(Slider)
admin.site.register(Review)
admin.site.register(Favorite)
admin.site.register(Reading)
admin.site.register(Borrow, BorrowAdmin)
admin.site.register(CustomPage)
admin.site.register(Contact)
admin.site.register(Blog)
admin.site.register(WaitingList)
