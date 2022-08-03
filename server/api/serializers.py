from rest_framework import serializers
from . import models


class TakeoffSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.TakeoffPoint


class CenterlineSerializer(serializers.ModelSerializer):
  footprint = []

  class Meta:
    model = models.Centerline
    fields = ('id', 'name', 'description', 'line',
              'footprint', 'elevation', '')


class ProjectSerializer(serializers.ModelSerializer):
  centerlines = CenterlineSerializer(many=True, read_only=True)
  takeoffs = TakeoffSerializer(many=True, read_only=True)

  class Meta:
    model = models.Project
    fields = ('id', 'name', 'description', 'centerlines', 'takeoffs')
