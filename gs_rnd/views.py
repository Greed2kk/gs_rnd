from django.shortcuts import render
from gs_rnd.models import Image, GasStation
from rest_framework.viewsets import ModelViewSet
from gs_rnd.serializers import ImageSerializer, GasStationSerializer


def view_home(request):
    return render(request, 'index.html')


class ImageViewSet(ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer


class GasStationViewSet(ModelViewSet):
    queryset = GasStation.objects.all()
    serializer_class = GasStationSerializer
    filter_fields = ['id', 'title', 'address', 'marker', 'logo']
