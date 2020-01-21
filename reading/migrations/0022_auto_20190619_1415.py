# Generated by Django 2.2.1 on 2019-06-19 14:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reading', '0021_page_image_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='book_type',
            field=models.IntegerField(blank=True, choices=[(1, 'Book'), (2, 'Magazine'), (3, 'Document'), (4, 'Manuscript')], null=True),
        ),
    ]