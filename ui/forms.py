from django import forms

from .models import Contact


class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ('name', 'phone', 'email', 'subject', 'message')

        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'phone': forms.TextInput(attrs={'class': 'form-control mt-10'}),
            'email': forms.TextInput(attrs={'class': 'form-control mt-10'}),
            'subject': forms.TextInput(attrs={'class': 'form-control mt-10'}),
            'message': forms.Textarea(attrs={'class': 'form-control mt-10'}),
        }
