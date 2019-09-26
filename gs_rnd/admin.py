from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin
from .models import GasStation, Image, Review, Fuel


@admin.register(GasStation)
class MarkerAdmin(OSMGeoAdmin):
    default_lon = 4420582.70
    default_lat = 5978522.25
    default_zoom = 13


admin.site.register(Image)
@admin.register(Review)

class RewiewAdmin(admin.ModelAdmin):
    list_display = ('id_gs', 'id_user', 'msg', 'rating')


@admin.register(Fuel)

class FuelAdmin(admin.ModelAdmin):
    list_display = ('id_gs', 'ai', 'price')


