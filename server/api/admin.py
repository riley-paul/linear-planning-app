from django.contrib import admin
from . import models

admin.site.register([
  models.Project,
  models.Centerline,
  models.ElevationPoint,
  models.ChainagePoint,
  models.FootprintAreas,
  models.FootprintType,
  models.TakeoffPoint,
  models.TakeoffCategory,
  models.TakeoffFamily,
  models.TakeoffRevision,
])

# Register your models here.
