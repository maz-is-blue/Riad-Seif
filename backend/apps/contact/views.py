from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactSubmission
from .serializers import ContactSubmissionSerializer


class ContactRateThrottle(AnonRateThrottle):
    """Rate limit contact form submissions."""
    rate = '5/hour'


@api_view(['POST'])
@throttle_classes([ContactRateThrottle])
def submit_contact(request):
    """
    Submit a contact form.
    
    Rate limited to 5 submissions per hour per IP.
    """
    serializer = ContactSubmissionSerializer(data=request.data)
    
    if serializer.is_valid():
        # Save the submission
        submission = serializer.save(
            ip_address=get_client_ip(request)
        )
        
        # Send email notification (optional)
        try:
            send_notification_email(submission)
        except Exception as e:
            # Log error but don't fail the request
            print(f"Failed to send email notification: {e}")
        
        return Response({
            'success': True,
            'message': 'Thank you for your message. We will get back to you soon.',
            'message_ar': 'شكراً لرسالتك. سنتواصل معك قريباً.',
            'id': submission.id,
        }, status=status.HTTP_201_CREATED)
    
    return Response({
        'success': False,
        'errors': serializer.errors,
    }, status=status.HTTP_400_BAD_REQUEST)


def get_client_ip(request):
    """Get the client's IP address from the request."""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def send_notification_email(submission):
    """Send email notification for new contact submission."""
    subject = f"New Contact Form Submission from {submission.name}"
    message = f"""
New contact form submission:

Name: {submission.name}
Email: {submission.email}
Phone: {submission.phone or 'Not provided'}
Subject: {submission.subject or 'Not provided'}

Message:
{submission.message}

---
Submitted at: {submission.created_at}
IP Address: {submission.ip_address}
"""
    
    send_mail(
        subject=subject,
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL if hasattr(settings, 'DEFAULT_FROM_EMAIL') else None,
        recipient_list=['info@riadseiflb.org'],
        fail_silently=True,
    )

