from rest_framework import serializers
from django.conf import settings
from urllib.parse import urlparse
from .models import Event, MemoryPhoto, ArchiveItem


def _media_url_to_relative_path(value: str | None):
    if not value:
        return None
    raw = str(value).strip()
    if not raw:
        return None

    parsed = urlparse(raw)
    path = parsed.path if parsed.scheme or parsed.netloc else raw
    media_prefix = settings.MEDIA_URL if settings.MEDIA_URL.startswith("/") else f"/{settings.MEDIA_URL}"
    if not media_prefix.endswith("/"):
        media_prefix = f"{media_prefix}/"

    if path.startswith(media_prefix):
        return path[len(media_prefix) :]
    if not path.startswith("/"):
        return path
    return None


class EventSerializer(serializers.ModelSerializer):
    """Serializer for Event model."""
    
    event_type_display = serializers.CharField(source='get_event_type_display', read_only=True)
    is_upcoming = serializers.BooleanField(read_only=True)
    is_past = serializers.BooleanField(read_only=True)
    cover_url = serializers.SerializerMethodField()
    cover_image = serializers.ImageField(write_only=True, required=False, allow_null=True)
    cover_upload_url = serializers.CharField(write_only=True, required=False, allow_blank=True)
    
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
            'cover_image',
            'cover_upload_url',
            'is_upcoming',
            'is_past',
            'is_featured',
            'is_published',
        ]

    def validate_cover_image(self, value):
        if not value:
            return value
        max_size = getattr(settings, "MAX_UPLOAD_SIZE", 100 * 1024 * 1024)
        max_size_mb = getattr(settings, "MAX_UPLOAD_SIZE_MB", 100)
        if value.size > max_size:
            raise serializers.ValidationError(
                f"Image is too large. Maximum allowed size is {max_size_mb} MB."
            )
        return value
    
    def get_cover_url(self, obj):
        if obj.cover_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.cover_image.url)
            return obj.cover_image.url
        return None

    def create(self, validated_data):
        upload_url = validated_data.pop('cover_upload_url', None)
        relative_path = _media_url_to_relative_path(upload_url)
        if relative_path:
            validated_data['cover_image'] = relative_path
        return super().create(validated_data)

    def update(self, instance, validated_data):
        upload_url = validated_data.pop('cover_upload_url', None)
        relative_path = _media_url_to_relative_path(upload_url)
        if relative_path:
            validated_data['cover_image'] = relative_path
        return super().update(instance, validated_data)


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
    image = serializers.ImageField(write_only=True, required=False, allow_null=True)
    image_upload_url = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = MemoryPhoto
        fields = [
            "id",
            "title_en",
            "title_ar",
            "description_en",
            "description_ar",
            "image_url",
            "image",
            "image_upload_url",
            "date",
            "is_published",
            "order",
        ]

    def validate_image(self, value):
        if not value:
            return value
        max_size = getattr(settings, "MAX_UPLOAD_SIZE", 100 * 1024 * 1024)
        max_size_mb = getattr(settings, "MAX_UPLOAD_SIZE_MB", 100)
        if value.size > max_size:
            raise serializers.ValidationError(
                f"Image is too large. Maximum allowed size is {max_size_mb} MB."
            )
        return value

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

    def create(self, validated_data):
        upload_url = validated_data.pop("image_upload_url", None)
        relative_path = _media_url_to_relative_path(upload_url)
        if relative_path:
            validated_data["image"] = relative_path
        return super().create(validated_data)

    def update(self, instance, validated_data):
        upload_url = validated_data.pop("image_upload_url", None)
        relative_path = _media_url_to_relative_path(upload_url)
        if relative_path:
            validated_data["image"] = relative_path
        return super().update(instance, validated_data)


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

