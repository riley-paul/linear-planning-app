from django.contrib.gis.db import models

class Project(models.Model):
  name = models.CharField(max_length=256)
  description = models.TextField()

class Centerline(models.Model):
  project = models.ForeignKey(Project, on_delete=models.CASCADE)
  footprint = models.JSONField()
  centerline = models.JSONField()
  chainage = models.JSONField()
  elevation = models.JSONField()  

class Takeoff(models.Model):
  project = models.ForeignKey(Project, on_delete=models.CASCADE)
  name = models.CharField(max_length=256)
  description = models.TextField()
  data = models.JSONField()
