from rest_framework.serializers import ModelSerializer, SerializerMethodField
from django.contrib.auth import get_user_model
from gs_rnd.models import Image, GasStation, Fuel, Review
from map import settings


class ImageSerializer(ModelSerializer):
    image_path = SerializerMethodField()

    def get_image_path(self, obj):
        return '{0}{1}'.format(settings.STATIC_URL, obj.image.name)

    class Meta:
        model = Image
        fields = '__all__'


class GasStationSerializer(ModelSerializer):

    class Meta:
        model = GasStation
        fields = '__all__'


class FuelSerializer(ModelSerializer):

    class Meta:
        model = Fuel
        fields = '__all__'


class ReviewSerializer(ModelSerializer):

    class Meta:
        model = Review
        fields = '__all__'


class UserSerializer(ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('username', 'email')
        ordering = ('username',)