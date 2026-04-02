from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.conf import settings
from django.core.files.storage import default_storage
from .models import SiteSettings, PageContent, TeamMember, NewsUpdate, SiteContentBlob, Job
from .permissions import AdminSectionPermission, has_permission, has_any_edit_permission
from .serializers import (
    SiteSettingsSerializer,
    PageContentSerializer,
    TeamMemberSerializer,
    NewsUpdateSerializer,
    NewsUpdateListSerializer,
    SiteContentBlobSerializer,
    JobSerializer,
    AdminJobSerializer,
)


@api_view(['GET'])
def get_site_settings(request):
    """Get site-wide settings (contact info, social links, footer)."""
    settings = SiteSettings.get_settings()
    serializer = SiteSettingsSerializer(settings)
    return Response(serializer.data)


@api_view(['GET'])
def get_page_content(request, page):
    """Get content for a specific page."""
    try:
        content = PageContent.objects.get(page=page)
        serializer = PageContentSerializer(content, context={'request': request})
        return Response(serializer.data)
    except PageContent.DoesNotExist:
        return Response({'error': 'Page content not found'}, status=404)


@api_view(['GET'])
def get_all_page_content(request):
    """Get content for all pages."""
    content = PageContent.objects.all()
    serializer = PageContentSerializer(content, many=True, context={'request': request})
    # Convert to dict keyed by page
    result = {item['page']: item for item in serializer.data}
    return Response(result)


@api_view(["GET", "PUT", "PATCH"])
@permission_classes([AllowAny])
def site_content_blob(request):
    """Get or update the full site content JSON."""
    blob = SiteContentBlob.get_content()

    if request.method == "GET":
        serializer = SiteContentBlobSerializer(blob)
        return Response(serializer.data)

    # Only admins can update
    if not has_permission(request.user, "content", "edit"):
        return Response({"detail": "Authentication required."}, status=401)

    serializer = SiteContentBlobSerializer(blob, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(["POST"])
@permission_classes([IsAdminUser])
@parser_classes([MultiPartParser, FormParser])
def upload_media(request):
    if not has_any_edit_permission(request.user):
        return Response({"detail": "Authentication required."}, status=401)
    if "file" not in request.FILES:
        return Response({"detail": "No file provided."}, status=400)
    upload = request.FILES["file"]
    path = default_storage.save(f"uploads/{upload.name}", upload)
    url = request.build_absolute_uri(settings.MEDIA_URL + path)
    return Response({"url": url}, status=200)


class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for team members."""
    
    queryset = TeamMember.objects.filter(is_active=True)
    serializer_class = TeamMemberSerializer


class NewsUpdateViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for news updates."""
    
    queryset = NewsUpdate.objects.filter(is_published=True)
    serializer_class = NewsUpdateSerializer
    
    def get_serializer_class(self):
        if self.action == 'list':
            return NewsUpdateListSerializer
        return NewsUpdateSerializer


class AdminTeamMemberViewSet(viewsets.ModelViewSet):
    """Admin CRUD for team members."""

    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [AdminSectionPermission.for_resource("team")]
    parser_classes = [MultiPartParser, FormParser, JSONParser]


class AdminNewsUpdateViewSet(viewsets.ModelViewSet):
    """Admin CRUD for news updates."""

    queryset = NewsUpdate.objects.all()
    serializer_class = NewsUpdateSerializer
    permission_classes = [AdminSectionPermission.for_resource("news")]
    parser_classes = [MultiPartParser, FormParser, JSONParser]


class JobViewSet(viewsets.ReadOnlyModelViewSet):
    """Public API endpoint for active jobs."""
    
    queryset = Job.objects.filter(is_active=True)
    serializer_class = JobSerializer


class AdminJobViewSet(viewsets.ModelViewSet):
    """Admin CRUD for jobs."""

    queryset = Job.objects.all()
    serializer_class = AdminJobSerializer
    permission_classes = [AdminSectionPermission.for_resource("jobs")]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
