from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    get_site_settings,
    get_page_content,
    get_all_page_content,
    site_content_blob,
    TeamMemberViewSet,
    NewsUpdateViewSet,
    AdminTeamMemberViewSet,
    AdminNewsUpdateViewSet,
)

router = DefaultRouter()
router.register(r'team', TeamMemberViewSet, basename='team')
router.register(r'news', NewsUpdateViewSet, basename='news')

admin_router = DefaultRouter()
admin_router.register(r'admin/team', AdminTeamMemberViewSet, basename='admin-team')
admin_router.register(r'admin/news', AdminNewsUpdateViewSet, basename='admin-news')

urlpatterns = [
    path('settings/', get_site_settings, name='site-settings'),
    path('pages/', get_all_page_content, name='all-pages'),
    path('pages/<str:page>/', get_page_content, name='page-content'),
    path('site-content/', site_content_blob, name='site-content'),
    path('', include(router.urls)),
    path('', include(admin_router.urls)),
]

