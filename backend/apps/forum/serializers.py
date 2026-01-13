from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    """Serializer for Event model."""
    
    event_type_display = serializers.CharField(source='get_event_type_display', read_only=True)
    is_upcoming = serializers.BooleanField(read_only=True)
    is_past = serializers.BooleanField(read_only=True)
    cover_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Event
        fields = [
            'id',
            'title_en',
            'title_ar',
            'description_en',
            'description_ar',
            'event_type',
            'event_type_display',
            'date',
            'end_date',
            'location',
            'is_online',
            'online_link',
            'registration_url',
            'cover_url',
            'is_upcoming',
            'is_past',
            'is_featured',
        ]
    
    def get_cover_url(self, obj):
        if obj.cover_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.cover_image.url)
            return obj.cover_image.url
        return None


class EventListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for event lists."""
    
    event_type_display = serializers.CharField(source='get_event_type_display', read_only=True)
    is_upcoming = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Event
        fields = [
            'id',
            'title_en',
            'title_ar',
            'event_type',
            'event_type_display',
            'date',
            'location',
            'is_online',
            'is_upcoming',
            'is_featured',
        ]

