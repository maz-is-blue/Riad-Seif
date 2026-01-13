from django.db import models


class Publication(models.Model):
    """Publication model for reports, policy briefs, manuals, etc."""
    
    CATEGORY_CHOICES = [
        ('report', 'Report / تقرير'),
        ('policy_brief', 'Policy Brief / ورقة سياسات'),
        ('manual', 'Manual / دليل'),
        ('research', 'Research / بحث'),
        ('article', 'Article / مقال'),
    ]
    
    # Bilingual content
    title_en = models.CharField(max_length=255, verbose_name='Title (English)')
    title_ar = models.CharField(max_length=255, verbose_name='Title (Arabic)')
    description_en = models.TextField(verbose_name='Description (English)')
    description_ar = models.TextField(verbose_name='Description (Arabic)')
    
    # Metadata
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    pdf_file = models.FileField(upload_to='publications/pdfs/', blank=True, null=True)
    cover_image = models.ImageField(upload_to='publications/covers/', blank=True, null=True)
    
    # Dates
    published_date = models.DateField(verbose_name='Publication Date')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Status
    is_published = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False, help_text='Show on homepage')
    
    class Meta:
        ordering = ['-published_date', '-created_at']
        verbose_name = 'Publication'
        verbose_name_plural = 'Publications'
    
    def __str__(self):
        return f"{self.title_en} ({self.get_category_display()})"
    
    @property
    def title(self):
        """Helper for templates"""
        return {'en': self.title_en, 'ar': self.title_ar}
    
    @property
    def description(self):
        """Helper for templates"""
        return {'en': self.description_en, 'ar': self.description_ar}

