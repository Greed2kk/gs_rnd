# Generated by Django 2.2.4 on 2019-08-27 08:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gs_rnd', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='image',
            field=models.ImageField(upload_to='images/', verbose_name='image'),
        ),
    ]