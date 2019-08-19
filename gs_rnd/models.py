from django.contrib.gis.db import models


class Image(models.Model):
    image = models.ImageField(verbose_name='Лого',)
    logo = models.ImageField(verbose_name='Маркер',)


class GasStation(models.Model):
    title = models.CharField (max_length = 50, verbose_name='Название',)
    coordinates = models.PointField (geography=True, verbose_name='Координаты',)
    image = models.ForeignKey(Image, on_delete=models.CASCADE, verbose_name='Маркер',)
    address = models.CharField(max_length = 100, verbose_name='Адрес')
    image = models.ForeignKey(Image, on_delete=models.CASCADE, verbose_name='Лого',)