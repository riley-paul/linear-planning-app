from django.http import JsonResponse
from rest_framework import viewsets
from .models import Project,Centerline,Takeoff
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

def to_json(request):
  if request.method == "POST":
    uploaded_file = request.FILES['file']
    data = gpd.read_file(uploaded_file)
  return JsonResponse(data.to_json())