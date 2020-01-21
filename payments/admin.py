from django.contrib import admin

from .models import Donation, Campaign


class DonationAdmin(admin.ModelAdmin):
    list_display = ['amount', 'campaign', 'created_at']
    list_filter = ['campaign', ]
    raw_id_fields = ['country']


admin.site.register(Donation, DonationAdmin)
admin.site.register(Campaign)
