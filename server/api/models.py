from django.contrib.gis.db import models
from centerline import format_KP

# Create your models here.


class Project(models.Model):
  name = models.CharField(max_length=256)
  description = models.TextField(blank=True)

  def __str__(self): return self.name


class Centerline(models.Model):
  project = models.ForeignKey(Project, on_delete=models.CASCADE)
  name = models.CharField(max_length=256)
  description = models.TextField(blank=True)
  line = models.MultiLineStringField()

  def __str__(self): return self.name


class ElevationPoint(models.Model):
  centerline = models.ForeignKey(Centerline, on_delete=models.CASCADE)
  KP = models.FloatField()
  elevation = models.FloatField()

  def __str__(self): return f"{format_KP(self.KP)}, {self.elevation}"


class ChainagePoint(models.Model):
  centerline = models.ForeignKey(Centerline, on_delete=models.CASCADE)
  geometry = models.PointField()
  measure = models.FloatField()
  display = models.CharField(max_length=64, blank=True)

  def __str__(self): return format_KP(self.measure)


class FootprintType(models.Model):
  name = models.CharField(max_length=256)
  colour = models.JSONField()

  def __str__(self): return self.name

  class Meta:
    verbose_name_plural = "Footprint Types"


class FootprintArea(models.Model):
  centerline = models.ForeignKey(Centerline, on_delete=models.CASCADE)
  footprint_type = models.ForeignKey(
      FootprintType, on_delete=models.CASCADE, blank=True)
  geometry = models.MultiPolygonField()
  description = models.TextField(blank=True)

  class Meta:
    verbose_name_plural = "Footprint Areas"


class TakeoffCategory(models.Model):
  name = models.CharField(max_length=256)
  description = models.TextField(blank=True)

  def __str__(self): return self.name

  class Meta:
    verbose_name_plural = "Takeoff Categories"


class TakeoffRevision(models.Model):
  category = models.ForeignKey(TakeoffCategory, on_delete=models.CASCADE)
  date_created = models.DateField()
  description = models.TextField(blank=True)


class TakeoffFamily(models.Model):
  colour1 = models.JSONField()
  colour2 = models.JSONField(blank=True)

  class Meta:
    verbose_name_plural = "Takeoff Families"


class TakeoffPoint(models.Model):
  project = models.ForeignKey(Project, on_delete=models.CASCADE)
  revision = models.ForeignKey(TakeoffRevision, on_delete=models.CASCADE)
  family = models.ForeignKey(TakeoffFamily, on_delete=models.CASCADE)

  KP_beg = models.FloatField()
  KP_end = models.FloatField(blank=True)

  text_shrt = models.TextField()
  text_long = models.TextField(blank=True)
  description = models.TextField(blank=True)
  value = models.FloatField()

  def __str__(self): return f"{format_KP(self.KP_beg)} - {self.text_shrt}"