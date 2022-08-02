from django.urls import path,include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'projects',views.ProjectViewSet)
router.register(r'centerlines',views.CenterlineViewSet)
router.register(r'takeoffs',views.TakeoffViewSet)

urlpatterns = [
  path('',include(router.urls)),
  path('api-auth/',include('rest_framework.urls',namespace='rest_framework')),
]
