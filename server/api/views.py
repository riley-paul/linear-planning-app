from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import ProjectSerializer,CenterlineSerializer,TakeoffSerializer
from .models import Project,Centerline,Takeoff

class ProjectViewSet(viewsets.ModelViewSet):
  queryset = Project.objects.all()
  serializer_class = ProjectSerializer

class CenterlineViewSet(viewsets.ModelViewSet):
  queryset = Centerline.objects.all()
  serializer_class = CenterlineSerializer

class TakeoffViewSet(viewsets.ModelViewSet):
  queryset = Takeoff.objects.all()
  serializer_class = TakeoffSerializer

