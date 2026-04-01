from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    get_site_settings,
    get_page_content,
    get_all_page_content,
    site_content_blob,
    upload_media,
    TeamMemberViewSet,
    NewsUpdateViewSet,
    AdminTeamMemberViewSet,
    AdminNewsUpdateViewSet,
    JobViewSet,
    AdminJobViewSet,
)

router = DefaultRouter()
router.register(r'team', TeamMemberViewSet, basename='team')
router.register(r'news', NewsUpdateViewSet, basename='news')
router.register(r'jobs', JobViewSet, basename='jobs')

admin_router = DefaultRouter()
admin_router.register(r'admin/team', AdminTeamMemberViewSet, basename='admin-team')
admin_router.register(r'admin/news', AdminNewsUpdateViewSet, basename='admin-news')
admin_router.register(r'admin/jobs', AdminJobViewSet, basename='admin-jobs')

urlpatterns = [
    path('settings/', get_site_settings, name='site-settings'),
    path('pages/', get_all_page_content, name='all-pages'),
    path('pages/<str:page>/', get_page_content, name='page-content'),
    path('site-content/', site_content_blob, name='site-content'),
    path('upload/', upload_media, name='upload-media'),
    path('', include(router.urls)),
    path('', include(admin_router.urls)),
]

