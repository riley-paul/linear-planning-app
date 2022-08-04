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



class TakeoffSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.TakeoffPoint

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


class CenterlineSerializer(serializers.ModelSerializer):
  footprint = []

  class Meta:
    model = models.Centerline
    fields = ('id', 'name', 'description', 'line',
              'footprint', 'elevation', '')


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
#       { id: int, name: str, desciption: str },
#       { id: int, name: str, desciption: str },
#       {...},
#     ]
#   },
#   {...},
# ]
# 
# #

class ProjectSerializer(serializers.ModelSerializer):
  centerlines = CenterlineSerializer(many=True, read_only=True)
  takeoffs = TakeoffSerializer(many=True, read_only=True)

  class Meta:
    model = models.Project
    fields = ('id', 'name', 'description', 'centerlines', 'takeoffs')
