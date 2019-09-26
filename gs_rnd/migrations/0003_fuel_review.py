# Generated by Django 2.2.5 on 2019-09-26 11:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('gs_rnd', '0002_auto_20190827_1124'),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('msg', models.CharField(max_length=100, verbose_name='сообщение с отзывом')),
                ('rating', models.IntegerField(verbose_name='оценка пользователя')),
                ('id_gs', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='id_gs', to='gs_rnd.GasStation', verbose_name='ИД_заправки')),
                ('id_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='id_user', to=settings.AUTH_USER_MODEL, verbose_name='ИД_пользователя')),
            ],
        ),
        migrations.CreateModel(
            name='Fuel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ai', models.CharField(max_length=100, verbose_name='Октановое число')),
                ('price', models.DecimalField(decimal_places=2, max_digits=8, verbose_name='Стоимость')),
                ('id_gs', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='fuels', to='gs_rnd.GasStation', verbose_name='ИД_заправки')),
            ],
        ),
    ]
