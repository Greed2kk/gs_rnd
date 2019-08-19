from django.urls import path
from gs_rnd.views import view_home


urlpatterns = [
    path('', view_home, name='map'),
]
