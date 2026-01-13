from django.db import models


class SiteSettings(models.Model):
    """Singleton model for site-wide settings."""
    
    # Contact info
    email = models.EmailField(default='info@riadseiflb.org')
    phone = models.CharField(max_length=20, default='+961 1 234 567')
    address_en = models.CharField(max_length=255, default='Damascus, Syria')
    address_ar = models.CharField(max_length=255, default='دمشق، سوريا')
    
    # Social links
    facebook_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    youtube_url = models.URLField(blank=True)
    
    # Footer
    footer_text_en = models.TextField(
        default='Dedicated to the memory and values of the Damascus Spring, working towards a free and democratic Syria for all its citizens.'
    )
    footer_text_ar = models.TextField(
        default='مكرسة لذكرى وقيم ربيع دمشق، وتعمل نحو سوريا حرة وديمقراطية لجميع مواطنيها.'
    )
    
    class Meta:
        verbose_name = 'Site Settings'
        verbose_name_plural = 'Site Settings'
    
    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        self.pk = 1
        super().save(*args, **kwargs)
    
    def delete(self, *args, **kwargs):
        pass  # Prevent deletion
    
    @classmethod
    def get_settings(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class PageContent(models.Model):
    """Editable content blocks for each page."""
    
    PAGE_CHOICES = [
        ('home', 'Home Page'),
        ('about', 'About Page'),
        ('founder', 'Founder Page'),
        ('center', 'Human Rights Center'),
        ('forum', 'Dialogue Forum'),
        ('publications', 'Publications'),
        ('contact', 'Contact Page'),
    ]
    
    page = models.CharField(max_length=50, choices=PAGE_CHOICES, unique=True)
    
    # Hero section
    hero_title_en = models.CharField(max_length=255, blank=True)
    hero_title_ar = models.CharField(max_length=255, blank=True)
    hero_subtitle_en = models.TextField(blank=True)
    hero_subtitle_ar = models.TextField(blank=True)
    hero_image = models.ImageField(upload_to='pages/heroes/', blank=True, null=True)
    
    # Main content
    content_en = models.TextField(blank=True, help_text='Main page content in English')
    content_ar = models.TextField(blank=True, help_text='Main page content in Arabic')
    
    # SEO
    meta_title_en = models.CharField(max_length=70, blank=True)
    meta_title_ar = models.CharField(max_length=70, blank=True)
    meta_description_en = models.CharField(max_length=160, blank=True)
    meta_description_ar = models.CharField(max_length=160, blank=True)
    
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Page Content'
        verbose_name_plural = 'Page Contents'
    
    def __str__(self):
        return f"Content: {self.get_page_display()}"


class TeamMember(models.Model):
    """Team/staff members to display on about page."""
    
    name_en = models.CharField(max_length=100)
    name_ar = models.CharField(max_length=100)
    role_en = models.CharField(max_length=100)
    role_ar = models.CharField(max_length=100)
    bio_en = models.TextField(blank=True)
    bio_ar = models.TextField(blank=True)
    photo = models.ImageField(upload_to='team/', blank=True, null=True)
    email = models.EmailField(blank=True)
    linkedin_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['order', 'name_en']
        verbose_name = 'Team Member'
        verbose_name_plural = 'Team Members'
    
    def __str__(self):
        return f"{self.name_en} - {self.role_en}"


class NewsUpdate(models.Model):
    """News/announcements for the homepage."""
    
    title_en = models.CharField(max_length=255)
    title_ar = models.CharField(max_length=255)
    summary_en = models.TextField()
    summary_ar = models.TextField()
    content_en = models.TextField(blank=True)
    content_ar = models.TextField(blank=True)
    
    image = models.ImageField(upload_to='news/', blank=True, null=True)
    external_link = models.URLField(blank=True, help_text='Link to external article')
    
    published_date = models.DateField()
    is_published = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-published_date', '-created_at']
        verbose_name = 'News Update'
        verbose_name_plural = 'News Updates'
    
    def __str__(self):
        return self.title_en

