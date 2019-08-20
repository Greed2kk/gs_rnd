from django.shortcuts import render
from gs_rnd.models import Image, GasStation
from rest_framework.viewsets import ModelViewSet
from django.views.generic import TemplateView
from gs_rnd.serializers import ImageSerializer, GasStationSerializer

from url_filter.integrations.drf import DjangoFilterBackend
from django.http import QueryDict
from url_filter.filtersets import ModelFilterSet


class IndexPageView(TemplateView):
    template_name = 'index.html'


class ImageFilter(DjangoFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if not len(request.query_params):
            return queryset
        q_object_str = ''
        for key in request.query_params:
            q_object_str += f'Q({key}="{request.query_params[key]}")|'
        q_object_str = q_object_str[:-1]

        # queryset.filter(Q(title__icontains='marker')|Q(description__icontains='marker'))
        return queryset.filter(eval(q_object_str))


class ImageViewSet(ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    filter_backends = [ImageFilter]


def view_home(request):
    return render(request, 'index.html')


class GasStationFilter(ModelFilterSet):
    class Meta(object):
        model = GasStation


class GasStationViewSet(ModelViewSet):
    queryset = GasStation.objects.all()
    serializer_class = GasStationSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['id', 'title', 'address', 'marker', 'logo']
