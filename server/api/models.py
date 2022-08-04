from django.contrib.gis.db import models
from centerline import format_KP

# Create your models here.


class Project(models.Model):
  name = models.CharField(max_length=256)
  description = models.TextField(blank=True, null=True)

  def __str__(self): return self.name


class Centerline(models.Model):
  project = models.ForeignKey(Project, on_delete=models.CASCADE)
  name = models.CharField(max_length=256)
  description = models.TextField(blank=True, null=True)
  geometry = models.MultiLineStringField()

  def __str__(self): return self.name


class ElevationPoint(models.Model):
  centerline = models.ForeignKey(Centerline, on_delete=models.CASCADE)
  chainage = models.FloatField()
  elevation = models.FloatField()
  geometry = models.PointField(blank=True,null=True)

  def __str__(self): return f"{self.centerline} ({format_KP(self.chainage)} - {self.elevation:.2f})"


class ChainagePoint(models.Model):
  centerline = models.ForeignKey(Centerline, on_delete=models.CASCADE)
  geometry = models.PointField()
  measure = models.FloatField()
  display = models.CharField(max_length=64, blank=True, null=True)

  def __str__(self): return f"{self.centerline.project} - {self.centerline} - {format_KP(self.measure)}"


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
  description = models.TextField(blank=True, null=True)

  class Meta:
    verbose_name_plural = "Footprint Areas"


class TakeoffCategory(models.Model):
  name = models.CharField(max_length=256)
  description = models.TextField(blank=True, null=True)

  def __str__(self): return self.name

  class Meta:
    verbose_name_plural = "Takeoff Categories"


class TakeoffRevision(models.Model):
  category = models.ForeignKey(TakeoffCategory, on_delete=models.CASCADE)
  date_created = models.DateField()
  description = models.TextField(blank=True, null=True)

  def __str__(self): return f"{self.category} - {self.date_created:%Y %m %d}"


class TakeoffFamily(models.Model):
  name = models.CharField(max_length=64)
  colour1 = models.JSONField()
  colour2 = models.JSONField(blank=True, null=True)

  def __str__(self): return f"{self.name}"

  class Meta:
    verbose_name_plural = "Takeoff Families"


class TakeoffPoint(models.Model):
  project = models.ForeignKey(Project, on_delete=models.CASCADE)
  revision = models.ForeignKey(TakeoffRevision, on_delete=models.CASCADE)
  family = models.ForeignKey(TakeoffFamily, on_delete=models.CASCADE)

  chainage_beg = models.FloatField()
  chainage_end = models.FloatField(blank=True, null=True)

  text_shrt = models.CharField(max_length=128)
  text_long = models.CharField(max_length=128, blank=True, null=True)
  description = models.TextField(blank=True, null=True)
  symbol = models.CharField(max_length=64, blank=True, null=True)
  value = models.FloatField()

  def __str__(self): return f"{format_KP(self.chainage_beg)} - {self.text_shrt}"
