from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    default_card = models.CharField(max_length=255, blank=True, null=True)
    stripe_id = models.CharField(max_length=255, blank=True, null=True)
    card_last = models.CharField(max_length=255, blank=True, null=True)
    card_expiry = models.CharField(blank=True, null=True, max_length=255)
    payment_active = models.BooleanField(default=False)

    def __str__(self):
        return self.username
