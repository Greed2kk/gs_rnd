from django.shortcuts import render
from django.views.generic import TemplateView
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

# Create your views here.


def view_home(request):
    return render(request, 'index.html', {
    })
