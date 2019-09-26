from django.urls import path, include
from gs_rnd.views import view_home, ImageViewSet, GasStationViewSet, UserViewSet, FuelViewSet, ReviewViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('images', ImageViewSet)
router.register('gas_stations', GasStationViewSet)
router.register('users', UserViewSet)
router.register('fuel', FuelViewSet)
router.register('review', ReviewViewSet)

urlpatterns = [
    path('', view_home, name='map'),
    path('api/', include(router.urls)),
    path('auth/', include('rest_auth.urls')),
    path('auth/registration/', include('rest_auth.registration.urls')),
    
]

