from django.contrib.gis.db import models


class Image(models.Model):
    image = models.ImageField(verbose_name='image', upload_to='images/')

    def __str__(self):
        return str(self.image)


class GasStation(models.Model):
    title = models.CharField(max_length=50, verbose_name='Название',)
    coordinates = models.PointField(verbose_name='Координаты', )
    marker = models.ForeignKey(Image, on_delete=models.PROTECT, verbose_name='Маркер', related_name='marker')
    address = models.CharField(max_length=100, verbose_name='Адрес')
    logo = models.ForeignKey(Image, on_delete=models.PROTECT, verbose_name='Лого', related_name='logo')

    def __str__(self):
        return '{0}, {1}'.format(self.address, self.title)
