from django.contrib.gis.db import models

class Project(models.Model):
  name = models.CharField(max_length=256)
  description = models.TextField(blank=True)

  def __str__(self):
    return self.name

class Centerline(models.Model):
  project = models.ForeignKey(Project, on_delete=models.CASCADE)
  name = models.CharField(max_length=256)
  measure_col = models.CharField(max_length=256,default="measure")
  centerline = models.JSONField()
  chainage = models.JSONField()
  elevation = models.JSONField(blank=True)
  footprint = models.JSONField(blank=True)

class Takeoff(models.Model):
  project = models.ForeignKey(Project, on_delete=models.CASCADE)
  name = models.CharField(max_length=256)
  description = models.TextField(blank=True)
  data = models.JSONField()
