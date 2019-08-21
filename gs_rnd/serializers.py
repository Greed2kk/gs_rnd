from rest_framework.serializers import ModelSerializer
from gs_rnd.models import Image, GasStation


class ImageSerializer(ModelSerializer):

    class Meta:
        model = Image
        fields = '__all__'


class GasStationSerializer(ModelSerializer):

    class Meta:
        model = GasStation
        fields = '__all__'
