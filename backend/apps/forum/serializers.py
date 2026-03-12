from rest_framework import serializers
from .models import Event, MemoryPhoto, ArchiveItem


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


class MemoryPhotoSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = MemoryPhoto
        fields = [
            "id",
            "title_en",
            "title_ar",
            "description_en",
            "description_ar",
            "image_url",
            "date",
            "is_published",
            "order",
        ]

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class ArchiveItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchiveItem
        fields = [
            "id",
            "title_en",
            "title_ar",
            "description_en",
            "description_ar",
            "date",
            "external_link",
            "is_published",
            "order",
        ]

