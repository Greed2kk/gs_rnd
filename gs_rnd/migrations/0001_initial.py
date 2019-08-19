# Generated by Django 2.2.4 on 2019-08-19 11:31

import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='', verbose_name='Лого')),
            ],
        ),
        migrations.CreateModel(
            name='GasStation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, verbose_name='Название')),
                ('coordinates', django.contrib.gis.db.models.fields.PointField(srid=4326, verbose_name='Координаты')),
                ('address', models.CharField(max_length=100, verbose_name='Адрес')),
                ('logo', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='logo', to='gs_rnd.Image', verbose_name='Лого')),
                ('marker', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='marker', to='gs_rnd.Image', verbose_name='Маркер')),
            ],
        ),
    ]
