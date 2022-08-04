from numpy import nan
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

def clean_str(string):
  return string.replace("'","''")

def convert_data(i):
  geo_types = (geo.MultiLineString, geo.Point, geo.MultiPolygon)
  if isinstance(i, int): return str(i)
  if isinstance(i, float): return str(i)
  if isinstance(i, str) and i != "NULL": return add_quotes(clean_str(i))
  if isinstance(i, geo_types): return f"ST_GeomFromText('{i.to_wkt()}',4326)"
  if isinstance(i, pd.Timestamp): return f"'{i:%Y-%m-%d}'"
  return i

def table_to_script(data,name):
  data = data[[i for i in data.columns if "temp" not in i]]
  data = data.dropna(axis=1,how="all").fillna("NULL")
  entries = [f"({', '.join(row.map(convert_data))})" for _,row in data.iterrows()]
  entries = ',\n'.join(entries)
  result = f"INSERT INTO {name} ({', '.join(data.columns)}) VALUES\n{entries};\n\n"
  return result

data_path = "server/pop_db/data"
takeoff_file = pd.ExcelFile(os.path.join(data_path,"takeoffs.xlsx"))

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
  fname = os.path.join(data_path,"chainage_points_ref.csv")
  ref = pd.read_csv(fname)
  dfs = []
  for _,row in ref.iterrows():
    df = gpd.read_file(row["geometry_fname"])
    data = df[["geometry"]].copy()
    data["measure"] = df[row.measure_column]
    data["centerline_id"] = row["centerline_id"]
    dfs.append(data)
  
  data = pd.concat(dfs)
  print(data)
  return table_to_script(data,name)

def api_takeoffcategory(name):
  data = takeoff_file.parse("categories")[["name"]]
  print(data)
  return table_to_script(data,name)

def api_takeoffrevision(name):
  data = takeoff_file.parse("revisions").drop("id",axis=1)  
  print(data)
  return table_to_script(data,name)

def api_takeofffamily(name):
  data = takeoff_file.parse("families") 
  print(data)
  return table_to_script(data,name)

def api_takeoffpoint(name):

  takeoffs_dict = [i for i in takeoff_file.sheet_names if "~" in i]
  takeoffs_dict = takeoff_file.parse(sheet_name=takeoffs_dict,usecols=range(9))

  takeoffs_list = []
  for (key,data) in takeoffs_dict.items():
    data["revision_id"] = int(key[1:3])
    data = (data
      .dropna(axis=1,how="all")
      .replace("",nan)
      .drop_duplicates()
    )
    takeoffs_list.append(data)

  takeoffs = (pd
    .concat(takeoffs_list,ignore_index=True)
    .drop("family_name", axis=1)
    .dropna(subset=["chainage_beg"])
  )
  takeoffs["value"] = takeoffs["value"].fillna(0)
  takeoffs["project_id"] = 1

  print(takeoffs)
  return table_to_script(takeoffs,name)

seed = ""
tables = [
  api_project,
  api_centerline,
  api_elevationpoint,
  # api_footprinttype,
  # api_footprintarea,
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

