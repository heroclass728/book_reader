from django.db.models import Sum
from django.http import HttpResponseForbidden
from django.views.generic import DetailView

from .models import User


class UserDetail(DetailView):
    model = User

    def dispatch(self, request, *args, **kwargs):
        if request.user.id != self.kwargs.get('pk'):
            return HttpResponseForbidden()
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = self.request.user

        context['user'] = user
        context['total'] = user.donation_set.values('amount').aggregate(total=Sum('amount'))['total']

        return context

