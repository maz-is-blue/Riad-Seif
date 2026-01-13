from django.contrib import admin
from .models import Event


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    """Admin configuration for Forum Events."""
    
    list_display = [
        'title_en',
        'event_type',
        'date',
        'location_display',
        'is_published',
        'is_featured',
    ]
    list_filter = ['event_type', 'is_online', 'is_published', 'is_featured', 'date']
    search_fields = ['title_en', 'title_ar', 'description_en', 'description_ar', 'location']
    date_hierarchy = 'date'
    ordering = ['-date']
    
    fieldsets = (
        ('English Content', {
            'fields': ('title_en', 'description_en'),
        }),
        ('Arabic Content', {
            'fields': ('title_ar', 'description_ar'),
        }),
        ('Event Details', {
            'fields': ('event_type', 'date', 'end_date', 'location', 'is_online', 'online_link', 'registration_url'),
        }),
        ('Media', {
            'fields': ('cover_image',),
        }),
        ('Status', {
            'fields': ('is_published', 'is_featured'),
        }),
    )
    
    list_editable = ['is_published', 'is_featured']
    list_per_page = 25
    
    def location_display(self, obj):
        """Display location or 'Online'."""
        if obj.is_online:
            return '🌐 Online'
        return obj.location or '-'
    location_display.short_description = 'Location'
    
    actions = ['publish_selected', 'unpublish_selected']
    
    @admin.action(description='Publish selected events')
    def publish_selected(self, request, queryset):
        queryset.update(is_published=True)
    
    @admin.action(description='Unpublish selected events')
    def unpublish_selected(self, request, queryset):
        queryset.update(is_published=False)

