from django.contrib.gis.db import models


class Image(models.Model):
    image = models.ImageField(verbose_name='Лого',)


class GasStation(models.Model):
    title = models.CharField(max_length=50, verbose_name='Название',)
    coordinates = models.PointField(verbose_name='Координаты',)
    marker_image = models.ForeignKey(Image, on_delete=models.PROTECT, verbose_name='Маркер',)
    address = models.CharField(max_length=100, verbose_name='Адрес')
    logo = models.ForeignKey(Image, on_delete=models.PROTECT, verbose_name='Лого',)
