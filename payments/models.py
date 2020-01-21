from django.db import models
from decimal import Decimal
from django.db.models import Sum, Count


class Donation(models.Model):
    ONE_TIME = 1
    MONTHLY = 2
    TYPES_CHOICES = (
        (ONE_TIME, 'One Time'),
        (MONTHLY, 'Monthly recurring donation')
    )
    user = models.ForeignKey('users.User', on_delete=models.SET_NULL, blank=True, null=True)
    amount = models.DecimalField(max_digits=20, decimal_places=2, default=Decimal('0.00'))
    name_on_card = models.CharField(max_length=255, blank=True, null=True)

    donation_type = models.IntegerField(choices=TYPES_CHOICES, default=ONE_TIME)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=255, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    address_2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    province = models.CharField(max_length=255, blank=True, null=True)
    postal_code = models.CharField(max_length=255, blank=True, null=True)
    country = models.ForeignKey('cities_light.Country', on_delete=models.SET_NULL, blank=True, null=True)
    on_behalf_of = models.CharField(max_length=255, blank=True, null=True)
    campaign = models.ForeignKey('Campaign', on_delete=models.SET_NULL, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.amount)


class Campaign(models.Model):
    name = models.CharField(max_length=255)
    goal = models.DecimalField(max_digits=20, decimal_places=2, default=Decimal('0.00'))
    description = models.TextField()
    image = models.ImageField(upload_to='campaign/', blank=True, null=True)

    def __str__(self):
        return self.name

    def get_raised(self):
        return self.donation_set.values('amount').aggregate(total=Sum('amount'))['total']

    def get_supporters(self):
        return self.donation_set.values('id').aggregate(total=Count('id'))['total']

    def get_founded_percent(self):
        raised = self.get_raised()
        if raised:
            return (raised / self.goal) * 100
        else:
            return 0
