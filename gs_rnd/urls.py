"""
импорт модулей path и include
"""
from django.urls import path#, include
# from rest_framework.routers import DefaultRouter
from gs_rnd.views import view_home
#
# router = DefaultRouter()

# router.register('users', UserViewSet)
# router.register('sights', SightViewSet)

URLPATTERNS = [
    path('', view_home, name='map'),  # URL has been named
    # path('api/', include(router.urls)),
    # path('auth/', include('rest_auth.urls')),
    # path('auth/registration/', include('rest_auth.registration.urls')),
]
