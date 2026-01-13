from django.urls import path
from .views import submit_contact

urlpatterns = [
    path('contact/', submit_contact, name='submit-contact'),
]

