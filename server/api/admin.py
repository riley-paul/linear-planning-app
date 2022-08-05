from django.contrib import admin
from . import models

class ProjectAdmin(admin.ModelAdmin):
  list_display = ['name', 'description']
admin.site.register(models.Project,ProjectAdmin)

class ChainagePointAdmin(admin.ModelAdmin):
  list_display = ['chainage_formatted','centerline','project']
admin.site.register(models.ChainagePoint,ChainagePointAdmin)

class ElevationPointAdmin(admin.ModelAdmin):
  list_display = ['chainage_formatted','elevation','project','centerline']
admin.site.register(models.ElevationPoint,ElevationPointAdmin)

class CenterlineAdmin(admin.ModelAdmin):
  list_display = ['name','project']
admin.site.register(models.Centerline,CenterlineAdmin)

class TakeoffPointAdmin(admin.ModelAdmin):
  list_display = ['text_shrt','chainage_beg_formatted','chainage_end_formatted','category']
admin.site.register(models.TakeoffPoint,TakeoffPointAdmin)

class FootprintAreaAdmin(admin.ModelAdmin):
  list_display = []
admin.site.register(models.FootprintArea,FootprintAreaAdmin)

class FootprintTypeAdmin(admin.ModelAdmin):
  list_display = []
admin.site.register(models.FootprintType,FootprintTypeAdmin)

class TakeoffCategoryAdmin(admin.ModelAdmin):
  list_display = ['name','description','project']
admin.site.register(models.TakeoffCategory,TakeoffCategoryAdmin)

class TakeoffFamilyAdmin(admin.ModelAdmin):
  list_display = ['name']
admin.site.register(models.TakeoffFamily,TakeoffFamilyAdmin)

class TakeoffRevisionAdmin(admin.ModelAdmin):
  list_display = ['category','date_created']
admin.site.register(models.TakeoffRevision,TakeoffRevisionAdmin)

# Register your models here.
