from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EventViewSet,
    MemoryPhotoViewSet,
    ArchiveItemViewSet,
    AdminEventViewSet,
    AdminMemoryPhotoViewSet,
    AdminArchiveItemViewSet,
)

router = DefaultRouter()
router.register(r'events', EventViewSet, basename='event')
router.register(r'memory', MemoryPhotoViewSet, basename='memory')
router.register(r'archive', ArchiveItemViewSet, basename='archive')

admin_router = DefaultRouter()
admin_router.register(r'admin/events', AdminEventViewSet, basename='admin-events')
admin_router.register(r'admin/memory', AdminMemoryPhotoViewSet, basename='admin-memory')
admin_router.register(r'admin/archive', AdminArchiveItemViewSet, basename='admin-archive')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(admin_router.urls)),
]

