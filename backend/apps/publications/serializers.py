from rest_framework import serializers
from .models import Publication


class PublicationSerializer(serializers.ModelSerializer):
    """Serializer for Publication model."""
    
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    pdf_url = serializers.SerializerMethodField()
    cover_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Publication
        fields = [
            'id',
            'title_en',
            'title_ar',
            'description_en',
            'description_ar',
            'category',
            'category_display',
            'pdf_url',
            'cover_url',
            'published_date',
            'is_featured',
            'created_at',
        ]
    
    def get_pdf_url(self, obj):
        if obj.pdf_file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.pdf_file.url)
            return obj.pdf_file.url
        return None
    
    def get_cover_url(self, obj):
        if obj.cover_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.cover_image.url)
            return obj.cover_image.url
        return None


class PublicationListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views."""
    
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = Publication
        fields = [
            'id',
            'title_en',
            'title_ar',
            'category',
            'category_display',
            'published_date',
            'is_featured',
        ]

