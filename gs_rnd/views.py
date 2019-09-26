from django.shortcuts import render
from gs_rnd.models import Image, GasStation, Review, Fuel
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from gs_rnd.serializers import ImageSerializer, GasStationSerializer, UserSerializer, ReviewSerializer, FuelSerializer
from django.contrib.auth import get_user_model


def view_home(request):
    return render(request, 'index.html')


class ImageViewSet(ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer


class GasStationViewSet(ModelViewSet):
    queryset = GasStation.objects.all()
    serializer_class = GasStationSerializer
    filter_fields = ['id', 'title', 'address', 'marker', 'logo']


class UserViewSet(ReadOnlyModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class FuelViewSet(ModelViewSet):
    queryset = Fuel.objects.all()
    serializer_class = FuelSerializer


class ReviewViewSet(ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


def view_home(request):
    return render(request, 'index.html', {
        'is_not_auth': not request.user.is_authenticated,
    })