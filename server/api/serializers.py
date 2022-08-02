from rest_framework import serializers
from .models import Project,Centerline,Takeoff

class ProjectSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Project
    fields = ('id','name','description')