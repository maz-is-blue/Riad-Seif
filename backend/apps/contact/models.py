from django.db import models


class ContactSubmission(models.Model):
    """Contact form submissions from website visitors."""
    
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    
    # Status tracking
    is_read = models.BooleanField(default=False)
    is_replied = models.BooleanField(default=False)
    notes = models.TextField(blank=True, help_text='Internal notes about this submission')
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact Submission'
        verbose_name_plural = 'Contact Submissions'
    
    def __str__(self):
        status = '✓' if self.is_read else '●'
        return f"{status} {self.name} - {self.email} ({self.created_at.strftime('%Y-%m-%d')})"

