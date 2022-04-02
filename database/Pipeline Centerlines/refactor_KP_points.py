from MISC import *
from ACAD import *

import shapefile

CL = import_CL()

KP_min = min(CL.KPs,key=lambda i: i.label)
KP_max = max(CL.KPs,key=lambda i: i.label)

new_KPs = [KP_min]
i = round_up(KP_min.label,100)
while i < KP_max.label:
  try: 
    pt = CL.from_KP(i)
  except:
    print("error:",format_KP(i))
  pt.label = i
  new_KPs.append(pt)
  if i % 1000 == 0: print(format_KP(i))
  i += 100

new_KPs.append(KP_max)

# fname = os.path.join("TMEP_S5_5.24.006","points")
# with shapefile.Writer(fname,shapeType=1) as w:
#   write_prj_file(fname)
#   w.field("KP","N")
#   for i in new_KPs:
#     w.record(i.label)
#     w.point(i.x,i.y)