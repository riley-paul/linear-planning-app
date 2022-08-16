import os
import zipfile
import json
import geopandas as gpd
import pandas as pd
import tempfile

from flask import Blueprint,request,jsonify
from werkzeug.utils import secure_filename

conversion = Blueprint("conversion",__name__,url_prefix="/conversion")

def allowed_file(filename,ftypes):
  return "." in filename and filename.rsplit('.', 1)[1].lower() in ftypes

def unzip(fname):
  dir_fname = os.path.splitext(fname)[0]
  with zipfile.ZipFile(fname,"r") as zip_ref:
    zip_ref.extractall(dir_fname)

def find_shp(fname):
  dirname = os.path.splitext(fname)[0]
  filename = next((i for i in os.listdir(dirname) if ".shp" in i), False)
  return os.path.join(dirname,filename) if filename else filename

@conversion.route("/json",methods=["GET","POST"])
def convert_json():
  ftypes = ["zip","csv"]

  if request.method == 'POST':
    # Ensure post request has file
    if "file" not in request.files:
      return jsonify({"error":"No 'file' component"}),400

    file = request.files["file"]
    
    # if user does not select file, browser also
    # submit an empty part without filename
    if file.filename == "":
      return jsonify({"error":"No file selected"}),400

    if not allowed_file(file.filename,ftypes):
      return jsonify({"error":f"Incorrect filename. Must be of the type {', '.join(ftypes)}"}),400

    filename = secure_filename(file.filename)
    with tempfile.TemporaryDirectory() as tmpdirname:

      # save file to temporary directory
      upload_fname = os.path.join(tmpdirname,filename)
      file.save(upload_fname)

      if ".zip" in upload_fname:
        unzip(upload_fname)
        shp_fname = find_shp(upload_fname)

        if not shp_fname:
          return jsonify({"error":"no .shp file found in zip file"}),400

        data = gpd.read_file(shp_fname).to_crs("EPSG:4326")
        data = pd.DataFrame(data)
        data["geometry"] = data.geometry.map(lambda i: i.wkt)

      elif ".csv" in upload_fname:
        data = (pd
          .read_csv(upload_fname)
          .dropna(axis=1,how="all")
          .dropna(axis=0,how="all")
          .reset_index(drop=True)
        )

      return jsonify(data.to_dict())

  return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''
  
@conversion.route("/geojson",methods=["GET","POST"])
def convert_geojson():
  ftypes = ["zip"]

  if request.method == 'POST':
    # Ensure post request has file
    if "file" not in request.files:
      return jsonify({"error":"No 'file' component"}),400

    file = request.files["file"]
    
    # if user does not select file, browser also
    # submit an empty part without filename
    if file.filename == "":
      return jsonify({"error":"No file selected"})

    if not allowed_file(file.filename,ftypes):
      return jsonify({"error":f"Incorrect filename. Must be of the type {', '.join(ftypes)}"}),400

    filename = secure_filename(file.filename)
    with tempfile.TemporaryDirectory() as tmpdirname:

      # save file to temporary directory
      upload_fname = os.path.join(tmpdirname,filename)
      file.save(upload_fname)

      data = pd.DataFrame()

      if ".zip" in upload_fname:
        unzip(upload_fname)
        shp_fname = find_shp(upload_fname)

        if not shp_fname:
          return jsonify({"error":"no .shp file found in zip file"}),400

        data = (gpd
          .read_file(shp_fname)
          .to_crs("EPSG:4326")
          .to_json()
        )

      return jsonify(json.loads(data))

  return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''

