from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PublicationViewSet, AdminPublicationViewSet

router = DefaultRouter()
router.register(r'publications', PublicationViewSet, basename='publication')
router.register(r'admin/publications', AdminPublicationViewSet, basename='admin-publication')

urlpatterns = [
    path('', include(router.urls)),
]

