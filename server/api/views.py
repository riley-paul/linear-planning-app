from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import ProjectSerializer
from .models import Project

class ProjectViewSet(viewsets.ModelViewSet):
  queryset = Project.objects.all()
  serializer_class = ProjectSerializer

# Create your views here.
def index(request):
  return HttpResponse("Hrello")

