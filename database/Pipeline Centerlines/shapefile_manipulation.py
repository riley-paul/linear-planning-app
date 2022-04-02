import shapefile
import os

from ACAD import *
from pprint import pprint

# path = "DATA/Pipeline Centerlines/CGL_S34_R10/points"
# new_path = "DATA/Pipeline Centerlines/CGL_S34_R10/points_new"


# with shapefile.Reader(path) as shp:
#   pprint(shp.fields)
#   KP_index = [i[0] for i in shp.fields].index("KP") - 1
#   pprint(shp.records()[2][KP_index])


#   with shapefile.Writer(new_path,shapeType=1) as w:
#     w.field("KP","N")
#     for shp_rcd in shp.iterShapeRecords():
#       if shp_rcd.record[KP_index] == None: continue
#       w.point(*shp_rcd.shape.points[0])
#       w.record(shp_rcd.record[KP_index])


def import_CL(which="TM5B"):
  # points.shp and line.shp in same directory
  # points.shp must have field named KP with chainages in m
  centerlines = {
    "TM5B": {
      "name": "Trans Mountain Expansion - Spread 5B",
      "folder": "TMEP_S5_5.24.002",
      "version": "5.24.002",
    },
    "TML1": {
      "name": "Trans Mountain Pipeline",
      "folder": "TMPL_ED41.35628",
      "version": "ED41.35628",
    },
    "CGL34": {
      "name": "Coastal Gaslink - Spreads 3 & 4",
      "folder": "CGL_S34_R10",
      "version": "R10",
    },
  }

  path = os.path.join("DATA","Pipeline Centerlines",centerlines[which]["folder"])

  print(f"\nimporting {centerlines[which]['name']} centerline")
  fname = os.path.join(path,"points")
  with shapefile.Reader(fname) as shp:
    KP_index = [i[0] for i in shp.fields].index("KP") - 1
    KPs = []
    for shp_rcd in shp.iterShapeRecords():
      coords_x = shp_rcd.shape.points[0][0]
      coords_y = shp_rcd.shape.points[0][1]
      label = float(shp_rcd.record[KP_index])
      KPs.append(Point(coords_x,coords_y,label=label))
    KPs.sort(key = lambda i: i.label)
    print(f"{len(KPs)} kilometer points imported")

  fname = os.path.join(path,"line")
  with shapefile.Reader(fname) as shp:
    points = [Point(i[0],i[1]) for i in shp.shapes()[0].points]
    print(f"{len(points)} vertices imported","\n")
  
  pl = Polyline(points,KPs)
  pl.version = centerlines[which]["version"]
  pl.name = centerlines[which]["name"]
  return pl

CL = import_CL("CGL34")