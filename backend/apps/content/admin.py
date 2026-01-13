from django.contrib import admin
from .models import SiteSettings, PageContent, TeamMember, NewsUpdate


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    """Admin for site-wide settings. Only one instance allowed."""
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('email', 'phone', 'address_en', 'address_ar'),
        }),
        ('Social Media', {
            'fields': ('facebook_url', 'twitter_url', 'linkedin_url', 'youtube_url'),
        }),
        ('Footer', {
            'fields': ('footer_text_en', 'footer_text_ar'),
        }),
    )
    
    def has_add_permission(self, request):
        """Only allow one instance."""
        return not SiteSettings.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        """Prevent deletion."""
        return False


@admin.register(PageContent)
class PageContentAdmin(admin.ModelAdmin):
    """Admin for page content blocks."""
    
    list_display = ['page', 'hero_title_en', 'updated_at']
    list_filter = ['page']
    search_fields = ['hero_title_en', 'hero_title_ar', 'content_en', 'content_ar']
    
    fieldsets = (
        ('Page', {
            'fields': ('page',),
        }),
        ('Hero Section (English)', {
            'fields': ('hero_title_en', 'hero_subtitle_en', 'hero_image'),
        }),
        ('Hero Section (Arabic)', {
            'fields': ('hero_title_ar', 'hero_subtitle_ar'),
        }),
        ('Main Content', {
            'fields': ('content_en', 'content_ar'),
        }),
        ('SEO (English)', {
            'fields': ('meta_title_en', 'meta_description_en'),
            'classes': ('collapse',),
        }),
        ('SEO (Arabic)', {
            'fields': ('meta_title_ar', 'meta_description_ar'),
            'classes': ('collapse',),
        }),
    )


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    """Admin for team members."""
    
    list_display = ['name_en', 'role_en', 'order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['name_en', 'name_ar', 'role_en', 'role_ar']
    ordering = ['order', 'name_en']
    list_editable = ['order', 'is_active']
    
    fieldsets = (
        ('English', {
            'fields': ('name_en', 'role_en', 'bio_en'),
        }),
        ('Arabic', {
            'fields': ('name_ar', 'role_ar', 'bio_ar'),
        }),
        ('Contact & Media', {
            'fields': ('photo', 'email', 'linkedin_url'),
        }),
        ('Display', {
            'fields': ('order', 'is_active'),
        }),
    )


@admin.register(NewsUpdate)
class NewsUpdateAdmin(admin.ModelAdmin):
    """Admin for news updates."""
    
    list_display = ['title_en', 'published_date', 'is_published', 'is_featured']
    list_filter = ['is_published', 'is_featured', 'published_date']
    search_fields = ['title_en', 'title_ar', 'summary_en', 'summary_ar']
    date_hierarchy = 'published_date'
    ordering = ['-published_date']
    list_editable = ['is_published', 'is_featured']
    
    fieldsets = (
        ('English Content', {
            'fields': ('title_en', 'summary_en', 'content_en'),
        }),
        ('Arabic Content', {
            'fields': ('title_ar', 'summary_ar', 'content_ar'),
        }),
        ('Media & Links', {
            'fields': ('image', 'external_link'),
        }),
        ('Publishing', {
            'fields': ('published_date', 'is_published', 'is_featured'),
        }),
    )

