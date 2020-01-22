from django.views.generic import ListView

from .models import Audio, Video


class AudioList(ListView):
    model = Audio
    template_name = 'storage/object_list.html'
    paginate_by = 18


class VideoList(ListView):
    model = Video
    template_name = 'storage/object_list.html'
    paginate_by = 18
