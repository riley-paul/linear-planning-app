import geopandas as gpd

from sqlalchemy import create_engine

from tkinter import Tk     # from tkinter import Tk for Python 3.x
from tkinter.filedialog import askopenfilename

engine = create_engine('postgresql://riley@localhost/virtual_grade_plan')
print(engine)



Tk().withdraw() # we don't want a full GUI, so keep the root window from appearing
filename = askopenfilename() # show an "Open" dialog box and return the path to the selected file

data = gpd.read_file(filename).to_crs("epsg:4326")

data["name"] = data["SSName"]
data["project"] = 1
data["line"] = data["geometry"]

result = gpd.GeoDataFrame()

data.to_postgis("api_centerline",engine,if_exists="append")
print(data)