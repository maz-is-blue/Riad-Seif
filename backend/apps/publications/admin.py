from django.contrib import admin
from .models import Publication


@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    """Admin configuration for Publications."""
    
    list_display = [
        'title_en',
        'category',
        'published_date',
        'is_published',
        'is_featured',
        'created_at',
    ]
    list_filter = ['category', 'is_published', 'is_featured', 'published_date']
    search_fields = ['title_en', 'title_ar', 'description_en', 'description_ar']
    date_hierarchy = 'published_date'
    ordering = ['-published_date']
    
    fieldsets = (
        ('English Content', {
            'fields': ('title_en', 'description_en'),
        }),
        ('Arabic Content', {
            'fields': ('title_ar', 'description_ar'),
        }),
        ('Details', {
            'fields': ('category', 'published_date', 'pdf_file', 'cover_image'),
        }),
        ('Status', {
            'fields': ('is_published', 'is_featured'),
        }),
    )
    
    list_editable = ['is_published', 'is_featured']
    list_per_page = 25
    
    actions = ['publish_selected', 'unpublish_selected', 'feature_selected']
    
    @admin.action(description='Publish selected publications')
    def publish_selected(self, request, queryset):
        queryset.update(is_published=True)
    
    @admin.action(description='Unpublish selected publications')
    def unpublish_selected(self, request, queryset):
        queryset.update(is_published=False)
    
    @admin.action(description='Mark as featured')
    def feature_selected(self, request, queryset):
        queryset.update(is_featured=True)

