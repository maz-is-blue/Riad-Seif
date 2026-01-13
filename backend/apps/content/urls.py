from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    get_site_settings,
    get_page_content,
    get_all_page_content,
    TeamMemberViewSet,
    NewsUpdateViewSet,
)

router = DefaultRouter()
router.register(r'team', TeamMemberViewSet, basename='team')
router.register(r'news', NewsUpdateViewSet, basename='news')

urlpatterns = [
    path('settings/', get_site_settings, name='site-settings'),
    path('pages/', get_all_page_content, name='all-pages'),
    path('pages/<str:page>/', get_page_content, name='page-content'),
    path('', include(router.urls)),
]

