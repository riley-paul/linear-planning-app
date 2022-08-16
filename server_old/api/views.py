from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response

from . import models
from . import serializers


class ProjectViewSet(viewsets.ModelViewSet):
  def list(self, request):
    queryset = models.Project.objects.all()
    serializer = serializers.ProjectSummarySerializer(queryset, many=True)
    return Response(serializer.data)

  def retrieve(self, request, pk=None):
    queryset = models.Project.objects.all()
    project = get_object_or_404(queryset, pk=pk)
    serializer = serializers.ProjectSerializer(project)
    return Response(serializer.data)


# class CenterlineViewSet(viewsets.ModelViewSet):
#   queryset = models.Centerline.objects.all()
#   serializer_class = serializers.CenterlineSerializer
#   http_method_names = ['get']


# class TakeoffViewSet(viewsets.ModelViewSet):
#   # only include the latest revisions of the takeoff
#   queryset = (models
#               .TakeoffRevision
#               .objects
#               .order_by("category", "-date_created")
#               .distinct("category")
#               )
#   serializer_class = serializers.TakeoffSerializer
#   http_method_names = ['get']
