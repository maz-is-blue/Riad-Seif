"""
URL configuration for Riad Seif Foundation backend.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.authtoken.views import obtain_auth_token
from apps.content.auth_views import ChangePasswordView

urlpatterns = [
    # Admin
    path('dj-admin/', admin.site.urls),
    path('api/auth/token/', obtain_auth_token, name='api-token-auth'),
    path('api/auth/change-password/', ChangePasswordView.as_view(), name='api-change-password'),
    
    # API endpoints
    path('api/', include('apps.publications.urls')),
    path('api/', include('apps.contact.urls')),
    path('api/', include('apps.forum.urls')),
    path('api/', include('apps.content.urls')),
    path('api/content/', include('apps.content.urls')),
    
    # API Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

