from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets

from .models import Project,Centerline,Takeoff
from .helpers import convert_gis_to_json
from .forms import JsonForm
from . import serializers

import geopandas as gpd

class ProjectViewSet(viewsets.ModelViewSet):
  queryset = Project.objects.all()
  serializer_class = serializers.ProjectSerializer

class CenterlineViewSet(viewsets.ModelViewSet):
  queryset = Centerline.objects.all()
  serializer_class = serializers.CenterlineSerializer

class TakeoffViewSet(viewsets.ModelViewSet):
  queryset = Takeoff.objects.all()
  serializer_class = serializers.TakeoffSerializer