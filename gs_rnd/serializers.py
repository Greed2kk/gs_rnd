from rest_framework.serializers import ModelSerializer
from gs_rnd.models import Image, GasStation


class ImageSerializer(ModelSerializer):

    class Meta:
        model = Image
        fields = ('id', 'image')
        ordering = ('id',)


class GasStationSerializer(ModelSerializer):

    class Meta:
        model = GasStation
        fields = ('id', 'title', 'coordinates', 'marker', 'address', 'logo')
        ordering = ('id',)
