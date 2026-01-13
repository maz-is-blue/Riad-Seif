from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import SiteSettings, PageContent, TeamMember, NewsUpdate
from .serializers import (
    SiteSettingsSerializer,
    PageContentSerializer,
    TeamMemberSerializer,
    NewsUpdateSerializer,
    NewsUpdateListSerializer,
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

