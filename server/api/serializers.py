from rest_framework import serializers
from .models import Project,Centerline,Takeoff

class ProjectSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Project
    fields = ('id','name','description')

class CenterlineSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Centerline
    fields = ('id','name','centerline','chainage','elevation','footprint')

class TakeoffSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Takeoff
    fields = ('id','name','data')