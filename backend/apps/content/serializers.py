from rest_framework import serializers
from django.conf import settings
from urllib.parse import urlparse
from .models import SiteSettings, PageContent, TeamMember, NewsUpdate, SiteContentBlob, Job


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
        rel = path[len(media_prefix) :]
        if "/" not in rel:
            return f"uploads/{rel}"
        return rel
    if path.startswith("media/"):
        return path[len("media/") :]
    # Allow already-relative media paths like "uploads/file.jpg"
    if not path.startswith("/"):
        if "/" not in path:
            return f"uploads/{path}"
        return path
    return None


class SiteSettingsSerializer(serializers.ModelSerializer):
    """Serializer for site-wide settings."""
    
    class Meta:
        model = SiteSettings
        fields = [
            'email',
            'phone',
            'address_en',
            'address_ar',
            'facebook_url',
            'twitter_url',
            'linkedin_url',
            'youtube_url',
            'footer_text_en',
            'footer_text_ar',
        ]


class PageContentSerializer(serializers.ModelSerializer):
    """Serializer for page content."""
    
    hero_image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = PageContent
        fields = [
            'page',
            'hero_title_en',
            'hero_title_ar',
            'hero_subtitle_en',
            'hero_subtitle_ar',
            'hero_image_url',
            'content_en',
            'content_ar',
            'meta_title_en',
            'meta_title_ar',
            'meta_description_en',
            'meta_description_ar',
        ]
    
    def get_hero_image_url(self, obj):
        if obj.hero_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.hero_image.url)
            return obj.hero_image.url
        return None


class TeamMemberSerializer(serializers.ModelSerializer):
    """Serializer for team members."""
    
    photo_url = serializers.SerializerMethodField()
    photo_upload_url = serializers.CharField(write_only=True, required=False, allow_blank=True)
    
    class Meta:
        model = TeamMember
        fields = [
            'id',
            'name_en',
            'name_ar',
            'role_en',
            'role_ar',
            'bio_en',
            'bio_ar',
            'photo_url',
            'photo_upload_url',
            'email',
            'linkedin_url',
            'order',
            'is_active',
        ]
    
    def get_photo_url(self, obj):
        if obj.photo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.photo.url)
            return obj.photo.url
        return None

    def create(self, validated_data):
        upload_url = validated_data.pop('photo_upload_url', None)
        relative_path = _media_url_to_relative_path(upload_url)
        if relative_path:
            validated_data['photo'] = relative_path
        return super().create(validated_data)

    def update(self, instance, validated_data):
        upload_url = validated_data.pop('photo_upload_url', None)
        relative_path = _media_url_to_relative_path(upload_url)
        if relative_path:
            validated_data['photo'] = relative_path
        return super().update(instance, validated_data)


class NewsUpdateSerializer(serializers.ModelSerializer):
    """Serializer for news updates."""
    
    image_url = serializers.SerializerMethodField()
    image_upload_url = serializers.CharField(write_only=True, required=False, allow_blank=True)
    
    class Meta:
        model = NewsUpdate
        fields = [
            'id',
            'title_en',
            'title_ar',
            'summary_en',
            'summary_ar',
            'content_en',
            'content_ar',
            'image_url',
            'image_upload_url',
            'external_link',
            'published_date',
            'is_featured',
            'is_published',
        ]
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

    def create(self, validated_data):
        upload_url = validated_data.pop('image_upload_url', None)
        relative_path = _media_url_to_relative_path(upload_url)
        if relative_path:
            validated_data['image'] = relative_path
        return super().create(validated_data)

    def update(self, instance, validated_data):
        upload_url = validated_data.pop('image_upload_url', None)
        relative_path = _media_url_to_relative_path(upload_url)
        if relative_path:
            validated_data['image'] = relative_path
        return super().update(instance, validated_data)


class NewsUpdateListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for news list."""

    image_url = serializers.SerializerMethodField()

    class Meta:
        model = NewsUpdate
        fields = [
            'id',
            'title_en',
            'title_ar',
            'summary_en',
            'summary_ar',
            'content_en',
            'content_ar',
            'image_url',
            'published_date',
            'is_featured',
        ]

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class SiteContentBlobSerializer(serializers.ModelSerializer):
    """Serializer for full site content JSON."""

    class Meta:
        model = SiteContentBlob
        fields = ["content", "updated_at"]


class JobSerializer(serializers.ModelSerializer):
    """Serializer for job opportunities (public)."""
    
    class Meta:
        model = Job
        fields = [
            'id',
            'title_en',
            'title_ar',
            'description_en',
            'description_ar',
            'requirements_en',
            'requirements_ar',
            'apply_info_en',
            'apply_info_ar',
            'is_active',
            'created_at',
        ]


class AdminJobSerializer(serializers.ModelSerializer):
    """Full serializer for admin CRUD."""
    
    class Meta:
        model = Job
        fields = '__all__'

