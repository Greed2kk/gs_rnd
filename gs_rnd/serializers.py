from rest_framework.serializers import ModelSerializer, SerializerMethodField
from gs_rnd.models import Image, GasStation
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
