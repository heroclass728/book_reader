from django import forms

from .models import Book

TEST_BOOK_CHOICES = (
    (0, 'No'),
    (1, 'Yes (will be removed after 30 days)')
)


class AddBookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ('name', 'content', 'creator', 'published', 'tags', 'collection', 'test_item', 'language',
                  'licence', 'meta_data', 'num_copies', 'category', 'file')
        widgets = {
            'collection': forms.Select(attrs={'class': 'form-control'}),
            'test_item':  forms.Select(attrs={'class': 'form-control'}, choices=TEST_BOOK_CHOICES),
            'language': forms.Select(attrs={'class': 'form-control', 'placeholder': 'Language of the work'}),
            'licence': forms.Select(attrs={'class': 'form-control'}),
            'category': forms.Select(attrs={'class': 'form-control', 'placeholder': 'Select a Category'}),
            'num_copies': forms.NumberInput(attrs={'class': 'form-control'}),
            'file': forms.FileInput(attrs={'class': 'form-control'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['collection'].required = True
        self.fields['file'].required = True
