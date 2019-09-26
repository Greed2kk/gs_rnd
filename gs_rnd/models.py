from django.contrib.gis.db import models
from django.contrib.auth import get_user_model


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


class Fuel(models.Model):
    id_gs = models.ForeignKey(GasStation, on_delete=models.PROTECT, verbose_name='Заправка', related_name='fuels')
    ai = models.CharField(max_length=100, verbose_name='Октановое число')
    price = models.DecimalField(max_digits=8, decimal_places=2, verbose_name='Стоимость')

    def __str__(self):
       return '{0}, {1}, {2} руб.'.format(self.id_gs,self.ai, self.price)


class Review(models.Model):
    id_gs = models.ForeignKey(GasStation, on_delete=models.PROTECT, verbose_name='Заправка', related_name='id_gs')
    id_user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, verbose_name='Пользователь', related_name='id_user')
    msg = models.CharField(max_length=100, verbose_name='Сообщение с отзывом')
    rating = models.IntegerField(verbose_name='Оценка пользователя')

    def __str__(self):
       return '{0}, {1}, {2}, {3}'.format(self.id_gs, self.id_user, self.msg, self.rating)