from pyexpat import model
from rest_framework import serializers
from . import models

#
# all_takeoffs = [
#   {
#     id: int,
#     name: str,
#     description: str,
#     cat_id: int,
#     cat_name: str,
#     cat_description: str,
#     rev_date: date,
#     rev_notes: str,
#     data: [
#       {
#         id: str,
#         KP_beg: float,
#         KP_end: float,
#         text_shrt: str,
#         text_long: str,
#         description: str,
#         colour: [int,int,int],
#       },
#       {...},
#     ]
#   },
#   {...}, 
# ]
# 
# latest_takeoffs = [...] # Filtered for latest rev_date and distinct cat_id
# 
# #



#
# centerlines = [
#   {
#     id: int,
#     name: str,
#     description: str,
#     geometry: multilinestring,
#     points: [
#       { id: int, geometry: point, measure: float, display: str },
#       { id: int, geometry: point, measure: float, display: str },
#       {...},
#     ],
#     footprint: [
#       { id: int, geometry: multipolygon, description: str, type_name: str, colour: [int,int,int] },
#       { id: int, geometry: multipolygon, description: str, type_name: str, colour: [int,int,int] },
#       {...},
#     ],
#     elevation: [
#       { id: int, KP: float, elevation: float },
#       { id: int, KP: float, elevation: float },
#       {...},
#     ],
#   },
#   {...},
# ]
# 
# 
# #



#
# projects = [
#   {
#     id: int, 
#     name: str, 
#     description: str, 
#     centerlines: [
#       { id: int, name: str, description: str },
#       { id: int, name: str, description: str },
#       {...},
#     ],
#     takeoffs: [
#       { id: int, name: str, desciption: str, revisions: [{date, notes}] },
#       { id: int, name: str, desciption: str },
#       {...},
#     ]
#   },
#   {...},
# ]
# 
# #

## Centerline detail

class ElevationSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.ElevationPoint
    fields = "__all__"


class ChainageSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.ChainagePoint
    fields = "__all__"


class CenterlineSerializer(serializers.ModelSerializer):
  elevation = ElevationSerializer(
    many=True, 
    read_only=True, 
    source="elevationpoint_set"
  )
  chainages = ChainageSerializer(
    many=True, 
    read_only=True, 
    source="chainagepoint_set"
  )
  footprint = None
  
  class Meta:
    model = models.Centerline
    fields = "__all__"


## Project Summary

class TakeoffRevisionSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.TakeoffRevision
    fields = "__all__"

class TakeoffSummarySerializer(serializers.ModelSerializer):
  revisions = TakeoffRevisionSerializer(
    many=True, 
    read_only=True, 
    source="takeoffrevision_set"
  )
  
  class Meta:
    model = models.TakeoffCategory
    fields = "__all__"

class CenterlineSummarySerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Centerline
    fields = ('id','name','description')

class ProjectSerializer(serializers.ModelSerializer):
  centerlines = CenterlineSummarySerializer(
    many=True, 
    read_only=True, 
    source="centerline_set"
  )

  takeoffs = TakeoffSummarySerializer(
    many=True, 
    read_only=True, 
    source="takeoffcategory_set"
  )

  class Meta:
    model = models.Project
    fields = ('id', 'name', 'description', 'centerlines', 'takeoffs')
