from django.db import models


class Event(models.Model):
    """Forum events and dialogue sessions."""
    
    EVENT_TYPE_CHOICES = [
        ('dialogue', 'Dialogue Session / جلسة حوار'),
        ('workshop', 'Workshop / ورشة عمل'),
        ('conference', 'Conference / مؤتمر'),
        ('webinar', 'Webinar / ندوة عبر الإنترنت'),
        ('training', 'Training / تدريب'),
    ]
    
    # Bilingual content
    title_en = models.CharField(max_length=255, verbose_name='Title (English)')
    title_ar = models.CharField(max_length=255, verbose_name='Title (Arabic)')
    description_en = models.TextField(verbose_name='Description (English)')
    description_ar = models.TextField(verbose_name='Description (Arabic)')
    
    # Event details
    event_type = models.CharField(max_length=50, choices=EVENT_TYPE_CHOICES, default='dialogue')
    date = models.DateTimeField()
    end_date = models.DateTimeField(null=True, blank=True, help_text='For multi-day events')
    location = models.CharField(max_length=255, blank=True)
    is_online = models.BooleanField(default=False)
    online_link = models.URLField(blank=True, help_text='Zoom/Teams link for online events')
    registration_url = models.URLField(blank=True)
    
    # Media
    cover_image = models.ImageField(upload_to='events/covers/', blank=True, null=True)
    
    # Status
    is_published = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-date']
        verbose_name = 'Event'
        verbose_name_plural = 'Events'
    
    def __str__(self):
        return f"{self.title_en} ({self.date.strftime('%Y-%m-%d')})"
    
    @property
    def is_upcoming(self):
        from django.utils import timezone
        return self.date > timezone.now()
    
    @property
    def is_past(self):
        from django.utils import timezone
        return self.date < timezone.now()

