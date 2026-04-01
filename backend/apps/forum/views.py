from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from apps.content.permissions import AdminSectionPermission
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.utils import timezone
from .models import Event, MemoryPhoto, ArchiveItem
from .serializers import EventSerializer, EventListSerializer, MemoryPhotoSerializer, ArchiveItemSerializer


class EventViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for forum events.
    
    list: Get all published events
    retrieve: Get a single event by ID
    upcoming: Get upcoming events
    past: Get past events
    """
    
    queryset = Event.objects.filter(is_published=True)
    serializer_class = EventSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title_en', 'title_ar', 'description_en', 'description_ar']
    ordering_fields = ['date']
    ordering = ['-date']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return EventListSerializer
        return EventSerializer
    
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Get upcoming events."""
        upcoming = self.queryset.filter(date__gte=timezone.now()).order_by('date')[:10]
        serializer = EventListSerializer(upcoming, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def past(self, request):
        """Get past events."""
        past = self.queryset.filter(date__lt=timezone.now()).order_by('-date')[:20]
        serializer = EventListSerializer(past, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured upcoming events for homepage."""
        featured = self.queryset.filter(
            is_featured=True,
            date__gte=timezone.now()
        ).order_by('date')[:3]
        serializer = EventListSerializer(featured, many=True, context={'request': request})
        return Response(serializer.data)


class MemoryPhotoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MemoryPhoto.objects.filter(is_published=True)
    serializer_class = MemoryPhotoSerializer


class ArchiveItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ArchiveItem.objects.filter(is_published=True)
    serializer_class = ArchiveItemSerializer


class AdminEventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [AdminSectionPermission.for_resource("events")]
    parser_classes = [MultiPartParser, FormParser, JSONParser]


class AdminMemoryPhotoViewSet(viewsets.ModelViewSet):
    queryset = MemoryPhoto.objects.all()
    serializer_class = MemoryPhotoSerializer
    permission_classes = [AdminSectionPermission.for_resource("memory")]
    parser_classes = [MultiPartParser, FormParser, JSONParser]


class AdminArchiveItemViewSet(viewsets.ModelViewSet):
    queryset = ArchiveItem.objects.all()
    serializer_class = ArchiveItemSerializer
    permission_classes = [AdminSectionPermission.for_resource("archive")]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

