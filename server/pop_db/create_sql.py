from cmath import isnan
import pandas as pd
import geopandas as gpd
import shapely.geometry as geo
import os

def to_multi(feature):
  if isinstance(feature,geo.Polygon): return geo.MultiPolygon([feature])
  if isinstance(feature,geo.LineString): return geo.MultiLineString([feature])
  return feature

def add_quotes(item):
  return f"'{item}'"

def convert_data(i):
  if isinstance(i, int): return str(i)
  if isinstance(i, float): return str(i)
  if isinstance(i, str): return add_quotes(i)
  if isinstance(i, (geo.MultiLineString, geo.Point, geo.MultiPolygon)): return f"ST_GeomFromText('{i.to_wkt()}',4326)"
  return i

def table_to_script(data,name):
  data = data[[i for i in data.columns if "temp" not in i]]
  data = data.dropna(axis=1,how="all")
  entries = [f"({', '.join(row.map(convert_data))})" for _,row in data.iterrows()]
  entries = ',\n'.join(entries)
  result = f"INSERT INTO {name} ({', '.join(data.columns)}) VALUES\n{entries};\n\n"
  return result

data_path = "server/pop_db/data"

def api_project(name):
  fname = os.path.join(data_path,"projects.csv")
  data = pd.read_csv(fname)
  print(data)
  return table_to_script(data,name)

def api_centerline(name):
  fname = os.path.join(data_path,"centerlines.csv")
  data = pd.read_csv(fname)
  data["geometry"] = data["temp_geometry_fname"].map(lambda i: to_multi(gpd.read_file(i).to_crs("epsg:4326").geometry[0]))
  print(data)
  return table_to_script(data,name)

def api_elevationpoint(name):
  fname = os.path.join(data_path,"elevation_points.csv")
  data = pd.read_csv(fname)
  data["geometry"] = (gpd
    .GeoSeries
    .from_wkt(data.geometry)
    .set_crs("epsg:26910")
    .to_crs("epsg:4326")
  )
  print(data)
  return table_to_script(data,name)

def api_footprinttype(name):
  return ""

def api_footprintarea(name):
  return ""

def api_chainagepoint(name):
  return ""

def api_takeoffcategory(name):
  return ""

def api_takeoffrevision(name):
  return ""

def api_takeofffamily(name):
  return ""

def api_takeoffpoint(name):
  return ""

seed = ""
tables = [
  api_project,
  api_centerline,
  api_elevationpoint,
  api_footprinttype,
  api_footprintarea,
  api_chainagepoint,
  api_takeoffcategory,
  api_takeoffrevision,
  api_takeofffamily,
  api_takeoffpoint,
]

# itrerate through reversed list and delete everything
for table in tables[::-1]: seed += f"TRUNCATE {table.__name__} RESTART IDENTITY CASCADE;\n"
seed += "\n"

# iterate through all tables and build file
for table in tables: seed += table(table.__name__)

with open("server/pop_db/results/seed.sql","w") as file:
  file.seek(0)
  file.write(seed)

