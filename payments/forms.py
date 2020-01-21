from cities_light.admin import City
from cities_light.forms import Region
from django import forms

from calendar import monthrange
from datetime import date

from .models import Donation


class CreditCardField(forms.IntegerField):
    def clean(self, value):
        """Check if given CC number is valid and one of the card types we accept."""
        value = value.replace(' ', '')
        if value and (len(value) < 13 or len(value) > 16):
            raise forms.ValidationError("Please enter in a valid credit card number.")
        return super(CreditCardField, self).clean(value)


class CCExpWidget(forms.MultiWidget):
    """Widget containing two select boxes for selecting the month and year."""

    def decompress(self, value):
        return [value.month, value.year] if value else [None, None]

    def format_output(self, rendered_widgets):
        html = u' / '.join(rendered_widgets)
        return u'<span style="white-space: nowrap;">%s</span>' % html


class CCExpField(forms.MultiValueField):
    EXP_MONTH = [(x, x) for x in range(1, 13)]
    EXP_YEAR = [(x, x) for x in range(date.today().year, date.today().year + 15)]
    default_error_messages = {
        'invalid_month': u'Enter a valid month.',
        'invalid_year': u'Enter a valid year.',
    }

    def __init__(self, *args, **kwargs):
        errors = self.default_error_messages.copy()
        if 'error_messages' in kwargs:
            errors.update(kwargs['error_messages'])
        fields = (
            forms.ChoiceField(choices=self.EXP_MONTH,
                              error_messages={'invalid': errors['invalid_month']},
                              widget=forms.Select(attrs={
                                  'class': 'form-control',
                                  'style': 'width: 50%; float: left;margin-top: 20px;'
                                           'height: 50px;font-size: 18px;'})),
            forms.ChoiceField(choices=self.EXP_YEAR,
                              error_messages={'invalid': errors['invalid_year']},
                              widget=forms.Select(attrs={
                                  'class': 'form-control', 'style':
                                      'width: 50%;margin-top: 25px;height: 50px; font-size: 18px;'})),
        )
        super(CCExpField, self).__init__(fields, *args, **kwargs)
        self.widget = CCExpWidget(widgets=[fields[0].widget, fields[1].widget])

    def clean(self, value):
        exp = super(CCExpField, self).clean(value)
        if date.today() > exp:
            raise forms.ValidationError("The expiration date you entered is in the past.")

        return exp

    def compress(self, data_list):
        if data_list:
            if data_list[1] in forms.fields.EMPTY_VALUES:
                error = self.error_messages['invalid_year']
                raise forms.ValidationError(error)
            if data_list[0] in forms.fields.EMPTY_VALUES:
                error = self.error_messages['invalid_month']
                raise forms.ValidationError(error)
            year = int(data_list[1])
            month = int(data_list[0])
            # find last day of the month
            day = monthrange(year, month)[1]
            return date(year, month, day)
        return None


class CreditCardForm(forms.Form):
    name = forms.CharField(
        label="Full Name",
        required=True,
        widget=forms.TextInput(attrs={'class': 'form-control mt-20', 'placeholder': 'Name on a Card'})
    )
    number = CreditCardField(
        required=True,
        label="Card Number",
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Card Number'})
    )
    expiration = CCExpField(
        required=True,
        label="Expiration"
    )
    cvc = forms.IntegerField(
        required=True,
        label="CVC Number",
        max_value=9999,
        widget=forms.TextInput(attrs={'size': '4', 'class': 'form-control mt-20', 'placeholder': 'CVC Number'})
    )

    def clean(self):
        cleaned = super(CreditCardForm, self).clean()

        return cleaned


class DonationForm(forms.ModelForm):
    class Meta:
        model = Donation
        fields = ('amount', 'donation_type', 'first_name', 'last_name', 'email', 'phone_number',
                  'address', 'address_2', 'city', 'province', 'postal_code', 'country', 'on_behalf_of')

        widgets = {
            'first_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'First Name'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Last Name'}),
            'email': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Email'}),
            'phone_number': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Phone Number'}),
            'address': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Street Address'}),
            'postal_code': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Postal Code'}),
            'on_behalf_of': forms.TextInput(attrs={'class': 'form-control',
                                                   'placeholder': 'This donation is on behalf of'}),
            'city': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'City'}),
            'address_2': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Street Address 2'}),
            'province': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Province'})
        }


class CountryForm(forms.ModelForm):
    class Meta:
        model = City
        fields = ('country', 'id')
        widgets = {
            'country': forms.Select(attrs={'class': 'form-control'})
        }
