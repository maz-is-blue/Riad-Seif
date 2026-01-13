from rest_framework import serializers
from .models import SiteSettings, PageContent, TeamMember, NewsUpdate


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
            'email',
            'linkedin_url',
        ]
    
    def get_photo_url(self, obj):
        if obj.photo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.photo.url)
            return obj.photo.url
        return None


class NewsUpdateSerializer(serializers.ModelSerializer):
    """Serializer for news updates."""
    
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
            'external_link',
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


class NewsUpdateListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for news list."""
    
    class Meta:
        model = NewsUpdate
        fields = [
            'id',
            'title_en',
            'title_ar',
            'summary_en',
            'summary_ar',
            'published_date',
            'is_featured',
        ]

