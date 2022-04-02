import shapefile
import os

from pprint import pprint
from ACAD import *
from MISC import write_prj_file

from pyproj import CRS,Proj
crs = CRS.from_epsg(26910)
proj = Proj(crs)

import matplotlib.pyplot as plt
fig,ax = plt.subplots()

fname = os.path.join("TMEP_S5_5.24.006/source/CNTRLINE_SSEID005p24p6")
with shapefile.Reader(fname) as shp:
  points = shp.shapes()[0].points
  points = [proj(*i) for i in points]
  points = [Point(*i) for i in points]
  # pprint(points)

fname = os.path.join("TMEP_S5_5.24.006/source/MRKRS_SSEID005p24p6")
with shapefile.Reader(fname) as shp:
  KP_index = [i[0] for i in shp.fields].index("Measure") - 1
  KP_points = []

  for shp_rcd in shp.iterShapeRecords():
    coords = proj(*shp_rcd.shape.points[0])
    label = shp_rcd.record[KP_index]
    KP_points.append(Point(*coords,label=label))

CL_new = Polyline(points,KP_points)
CL_old = import_CL()
CL_old_line = CL_old.splice(CL_old.vertices[0],CL_new.vertices[0])

print(min(KP_points,key=lambda i: i.label).label)

CL_new.plot(ax)
CL_old_line.plot(ax,"r")

new_vertices = CL_old_line.vertices + CL_new.vertices
new_KPs = [i for i in CL_old.KPs if i.label < 987100] + CL_new.KPs
CL = Polyline(new_vertices,new_KPs)

fname = os.path.join("TMEP_S5_5.24.006","line")
with shapefile.Writer(fname,shapeType=3) as w:
  write_prj_file(fname)
  w.field("name","C")
  w.record("centerline")
  w.line([CL.KML_coords()])

fname = os.path.join("TMEP_S5_5.24.006","points")
with shapefile.Writer(fname,shapeType=1) as w:
  write_prj_file(fname)
  w.field("KP","N")
  for i in CL.KPs:
    w.record(i.label)
    w.point(i.x,i.y)

CL.plot(ax,"b")

ax.set_aspect("equal",adjustable="box")
plt.show()