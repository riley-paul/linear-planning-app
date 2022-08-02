from django.contrib.gis.db import models

# Create your models here.
class WorldBorder(models.Model):
  mpoly = models.MultiPolygonField()
  name = models.CharField(max_length=50)

  def __str__(self):
    return self.name