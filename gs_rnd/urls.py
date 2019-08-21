from django.urls import path, include
from gs_rnd.views import view_home, ImageViewSet, GasStationViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('images', ImageViewSet)
router.register('gas_stations', GasStationViewSet)

urlpatterns = [
    path('', view_home, name='map'),
    path('api/', include(router.urls)),
]
