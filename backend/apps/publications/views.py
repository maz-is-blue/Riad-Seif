from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Publication
from .serializers import PublicationSerializer, PublicationListSerializer


class PublicationViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for publications.
    
    list: Get all published publications
    retrieve: Get a single publication by ID
    featured: Get featured publications for homepage
    """
    
    queryset = Publication.objects.filter(is_published=True)
    serializer_class = PublicationSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title_en', 'title_ar', 'description_en', 'description_ar']
    ordering_fields = ['published_date', 'created_at']
    ordering = ['-published_date']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return PublicationListSerializer
        return PublicationSerializer
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured publications for homepage."""
        featured = self.queryset.filter(is_featured=True)[:6]
        serializer = PublicationListSerializer(featured, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get publications grouped by category."""
        categories = {}
        for pub in self.queryset:
            cat = pub.category
            if cat not in categories:
                categories[cat] = []
            categories[cat].append(PublicationListSerializer(pub).data)
        return Response(categories)

