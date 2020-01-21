import stripe

from django.shortcuts import redirect, render
from django.views import View
from django.views.generic import FormView, ListView, DetailView
from django.conf import settings

from .forms import CreditCardForm, DonationForm, CountryForm
from .models import Donation, Campaign
from django.contrib import messages

stripe.api_key = settings.STRIPE_API_KEY


class QuickDonateView(View):
    template_name = 'payments/quick.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name, {})

    def post(self, request, *args, **kwargs):
        amount = request.POST.get('amount')
        other_amount = request.POST.get('other_amount')
        user = request.user

        if not any([amount, other_amount]):
            messages.add_message(self.request, messages.ERROR, 'Please choose an amount bellow')
            return render(request, self.template_name, {})

        if amount:
            amount = int(amount)
        elif other_amount:
            amount = int(other_amount)

        try:
            stripe.Charge.create(
                amount=amount * 100,
                currency="usd",
                customer=user.stripe_id,
                description="${} Donation for SIKH NATIONAL ARCHIVES OF CANADA from {}".format(amount, user.email),
            )
            Donation.objects.create(user=self.request.user, amount=amount)
            messages.add_message(self.request, messages.SUCCESS, 'Thank you {}!'.format(user.first_name))
            return render(request, self.template_name, {})
        except Exception as e:
            user.payment_active = False
            user.save()
            messages.add_message(self.request, messages.ERROR, str(e))
        return render(request, self.template_name, {})


class DonateView(FormView):
    template_name = 'payments/donate.html'
    form_class = CreditCardForm

    def form_valid(self, form):
        amount = self.request.POST.get('amount')
        other_amount = self.request.POST.get('other_amount')
        save_card = self.request.POST.get('save_card')

        if not any([amount, other_amount]):
            messages.add_message(self.request, messages.ERROR, 'Please choose an amount bellow')
            return redirect('campaign_detail', self.kwargs.get('pk'))

        if amount:
            amount = int(amount)
        elif other_amount:
            amount = int(other_amount)
        else:
            messages.add_message(self.request, messages.ERROR, 'Please ')
            return self.form_invalid(form)

        try:
            token = stripe.Token.create(card={
                "number": form.cleaned_data['number'],
                "exp_month": form.cleaned_data["expiration"].month,
                "exp_year": form.cleaned_data["expiration"].year,
                "cvc": form.cleaned_data['cvc'],
                'name': form.cleaned_data['name'],
            },)
            name_on_card = form.cleaned_data['name']
        except Exception as e:
            messages.add_message(self.request, messages.ERROR, str(e))
            return self.form_invalid(form)
        customer = stripe.Customer.create(source=token.id,
                                          description="Customer of SIKH NATIONAL ARCHIVES OF CANADA {}".format(amount))
        try:
            stripe.Charge.create(
                amount=amount * 100,
                currency="usd",
                customer=customer.stripe_id,
                description="${} Donation for SIKH NATIONAL ARCHIVES OF CANADA from {}".format(amount, name_on_card),
            )
        except Exception as e:
            messages.add_message(self.request, messages.ERROR, str(e))
            return self.form_invalid(form)

        # It was in old version, not saving cards now
        if self.request.user.is_authenticated and save_card:
            user = self.request.user
            user.default_card = customer['default_source']
            user.stripe_id = customer['id']
            card = customer['sources']['data'][0]
            user.card_last = card['last4']
            user.card_expiry = '{}/{}'.format(str(card['exp_month']), str(card['exp_year']))
            user.payment_active = True
            user.save()

        campaign = Campaign.objects.get(id=self.request.POST.get('campaign_id'))

        # Getting all info from DonationForm
        first_name = self.request.POST.get('first_name')
        last_name = self.request.POST.get('last_name')
        email = self.request.POST.get('email')
        phone_number = self.request.POST.get('phone_number')
        address = self.request.POST.get('address')
        postal_code = self.request.POST.get('postal_code')
        on_behalf_of = self.request.POST.get('on_behalf_of')
        city = self.request.POST.get('city')
        address_2 = self.request.POST.get('address_2')
        province = self.request.POST.get('province')
        country = self.request.POST.get('country')
        donation_type = self.request.POST.get('donation_type', 1)

        donation = Donation.objects.create(name_on_card=name_on_card,
                                           amount=amount,
                                           campaign=campaign,
                                           first_name=first_name,
                                           last_name=last_name,
                                           email=email,
                                           phone_number=phone_number,
                                           address=address,
                                           postal_code=postal_code,
                                           on_behalf_of=on_behalf_of,
                                           city=city,
                                           address_2=address_2,
                                           province=province,
                                           country_id=country,
                                           donation_type=donation_type
                                           )
        if self.request.user.is_authenticated:
            donation.user = self.request.user
            donation.save()

        messages.add_message(self.request, messages.SUCCESS, 'Thank you for your donation')
        return redirect('home')


class CampaignListView(ListView):
    model = Campaign


class CampaignDetailView(DetailView):
    model = Campaign

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['amount'] = self.request.GET.get('amount')
        context['form'] = CreditCardForm
        context['donation_form'] = DonationForm
        context['countries'] = CountryForm(initial={'country': '38'})
        return context
