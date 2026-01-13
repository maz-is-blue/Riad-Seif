from django.contrib import admin
from .models import ContactSubmission


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    """Admin configuration for Contact Submissions."""
    
    list_display = [
        'name',
        'email',
        'subject_preview',
        'is_read',
        'is_replied',
        'created_at',
    ]
    list_filter = ['is_read', 'is_replied', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    date_hierarchy = 'created_at'
    ordering = ['-created_at']
    readonly_fields = ['name', 'email', 'phone', 'subject', 'message', 'created_at', 'ip_address']
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'phone'),
        }),
        ('Message', {
            'fields': ('subject', 'message'),
        }),
        ('Status', {
            'fields': ('is_read', 'is_replied', 'notes'),
        }),
        ('Metadata', {
            'fields': ('created_at', 'ip_address'),
            'classes': ('collapse',),
        }),
    )
    
    list_editable = ['is_read', 'is_replied']
    list_per_page = 50
    
    def subject_preview(self, obj):
        """Show truncated subject."""
        return obj.subject[:50] + '...' if len(obj.subject) > 50 else obj.subject or '-'
    subject_preview.short_description = 'Subject'
    
    actions = ['mark_as_read', 'mark_as_replied']
    
    @admin.action(description='Mark as read')
    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
    
    @admin.action(description='Mark as replied')
    def mark_as_replied(self, request, queryset):
        queryset.update(is_read=True, is_replied=True)
    
    def has_add_permission(self, request):
        """Disable adding submissions from admin."""
        return False

