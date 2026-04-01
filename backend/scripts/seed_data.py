"""
Seed script to populate the database with initial data.
Run with: python manage.py shell < scripts/seed_data.py
Or: python manage.py runscript seed_data (if using django-extensions)
"""

import os
import sys
import django
from datetime import date, datetime, timedelta

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
django.setup()

from apps.publications.models import Publication
from apps.forum.models import Event
from apps.content.models import SiteSettings, PageContent, NewsUpdate, Job
from django.contrib.auth.models import User

def create_superuser():
    """Create admin superuser if not exists."""
    username = 'riadseifadmin'
    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(
            username=username,
            email='admin@riadseiffoundation.org',
            password='riadseif123'
        )
        print(f"✓ Created superuser: {username} / riadseif123")
    else:
        print("- Superuser already exists")

def create_site_settings():
    """Create or update site settings."""
    settings = SiteSettings.get_settings()
    settings.email = 'info@riadseiflb.org'
    settings.phone = '+961 1 234 567'
    settings.address_en = 'Damascus, Syria'
    settings.address_ar = 'دمشق، سوريا'
    settings.facebook_url = 'https://facebook.com/riadseiflb'
    settings.twitter_url = 'https://twitter.com/riadseiflb'
    settings.linkedin_url = 'https://linkedin.com/company/riadseiflb'
    settings.save()
    print("✓ Site settings configured")

def create_publications():
    """Create sample publications."""
    publications_data = [
        {
            'title_en': 'Transitional Justice Mechanisms in Post-Conflict Syria',
            'title_ar': 'آليات العدالة الانتقالية في سوريا ما بعد النزاع',
            'description_en': 'A comprehensive analysis of legal frameworks required for accountability in post-conflict Syria.',
            'description_ar': 'تحليل شامل للأطر القانونية المطلوبة للمساءلة في سوريا ما بعد النزاع.',
            'category': 'report',
            'published_date': date(2024, 12, 15),
            'is_featured': True,
        },
        {
            'title_en': "Women's Role in Constitutional Reform",
            'title_ar': 'دور المرأة في الإصلاح الدستوري',
            'description_en': "Examining the importance of women's participation in drafting Syria's new constitution.",
            'description_ar': 'دراسة أهمية مشاركة المرأة في صياغة الدستور السوري الجديد.',
            'category': 'policy_brief',
            'published_date': date(2024, 11, 20),
            'is_featured': True,
        },
        {
            'title_en': 'Legal Advocacy Toolkit for Practitioners',
            'title_ar': 'مجموعة أدوات المناصرة القانونية للممارسين',
            'description_en': 'Practical guide for lawyers working on human rights cases in Syria.',
            'description_ar': 'دليل عملي للمحامين العاملين في قضايا حقوق الإنسان في سوريا.',
            'category': 'manual',
            'published_date': date(2024, 10, 10),
            'is_featured': True,
        },
        {
            'title_en': 'Annual Human Rights Report 2023',
            'title_ar': 'تقرير حقوق الإنسان السنوي 2023',
            'description_en': 'Comprehensive annual report on human rights situation in Syria.',
            'description_ar': 'تقرير سنوي شامل عن وضع حقوق الإنسان في سوريا.',
            'category': 'report',
            'published_date': date(2023, 12, 31),
            'is_featured': False,
        },
    ]
    
    for pub_data in publications_data:
        pub, created = Publication.objects.get_or_create(
            title_en=pub_data['title_en'],
            defaults=pub_data
        )
        if created:
            print(f"✓ Created publication: {pub.title_en[:50]}...")
        else:
            print(f"- Publication exists: {pub.title_en[:50]}...")

def create_events():
    """Create sample forum events."""
    events_data = [
        {
            'title_en': 'Session 45: Youth Role in Local Governance',
            'title_ar': 'الجلسة 45: دور الشباب في الحكم المحلي',
            'description_en': 'A dialogue session focusing on empowering youth participation in local governance structures.',
            'description_ar': 'جلسة حوارية تركز على تمكين مشاركة الشباب في هياكل الحكم المحلي.',
            'event_type': 'dialogue',
            'date': datetime.now() + timedelta(days=30),
            'is_online': True,
            'is_featured': True,
        },
        {
            'title_en': 'Workshop: Documenting Human Rights Violations',
            'title_ar': 'ورشة عمل: توثيق انتهاكات حقوق الإنسان',
            'description_en': 'Training workshop for activists and lawyers on documentation best practices.',
            'description_ar': 'ورشة تدريبية للناشطين والمحامين حول أفضل ممارسات التوثيق.',
            'event_type': 'workshop',
            'date': datetime.now() + timedelta(days=45),
            'location': 'Damascus Cultural Center',
            'is_online': False,
            'is_featured': True,
        },
        {
            'title_en': 'Session 44: Reconciliation and Social Cohesion',
            'title_ar': 'الجلسة 44: المصالحة والتماسك الاجتماعي',
            'description_en': 'Exploring pathways to reconciliation and rebuilding social trust.',
            'description_ar': 'استكشاف مسارات المصالحة وإعادة بناء الثقة الاجتماعية.',
            'event_type': 'dialogue',
            'date': datetime.now() - timedelta(days=15),
            'is_online': True,
            'is_featured': False,
        },
    ]
    
    for event_data in events_data:
        event, created = Event.objects.get_or_create(
            title_en=event_data['title_en'],
            defaults=event_data
        )
        if created:
            print(f"✓ Created event: {event.title_en[:50]}...")
        else:
            print(f"- Event exists: {event.title_en[:50]}...")

def create_news():
    """Create sample news updates."""
    news_data = [
        {
            'title_en': 'Foundation Launches New Training Program',
            'title_ar': 'المؤسسة تطلق برنامجاً تدريبياً جديداً',
            'summary_en': 'The Riad Seif Foundation announces a new comprehensive training program for young lawyers.',
            'summary_ar': 'تعلن مؤسسة رياض سيف عن برنامج تدريبي شامل جديد للمحامين الشباب.',
            'published_date': date.today() - timedelta(days=5),
            'is_featured': True,
        },
        {
            'title_en': 'Partnership with International Human Rights Organizations',
            'title_ar': 'شراكة مع منظمات حقوق الإنسان الدولية',
            'summary_en': 'New partnerships established to strengthen human rights advocacy in Syria.',
            'summary_ar': 'شراكات جديدة لتعزيز الدفاع عن حقوق الإنسان في سوريا.',
            'published_date': date.today() - timedelta(days=12),
            'is_featured': True,
        },
    ]
    
    for news_item in news_data:
        news, created = NewsUpdate.objects.get_or_create(
            title_en=news_item['title_en'],
            defaults=news_item
        )
        if created:
            print(f"✓ Created news: {news.title_en[:50]}...")
        else:
            print(f"- News exists: {news.title_en[:50]}...")

def create_jobs():
    """Create sample job opportunities."""
    jobs_data = [
        {
            'title_en': 'Human Rights Legal Researcher',
            'title_ar': 'باحث قانوني في حقوق الإنسان',
            'description_en': 'Conduct research on transitional justice mechanisms and produce reports.',
            'description_ar': 'إجراء بحوث حول آليات العدالة الانتقالية وإعداد التقارير.',
            'requirements_en': 'LLB, 2+ years experience, Arabic/English fluency, research skills.',
            'requirements_ar': 'بكالوريوس قانون, خبرة 2+ سنوات, إجادة العربية/الإنجليزية, مهارات بحثية.',
            'apply_info_en': 'Send CV and cover letter to jobs@riadseiflb.org with subject "Legal Researcher".',
            'apply_info_ar': 'أرسل السيرة الذاتية وخطاب التقديم إلى jobs@riadseiflb.org بعنوان "باحث قانوني".',
        },
        {
            'title_en': 'Program Coordinator - Youth Empowerment',
            'title_ar': 'منسق برامج - تمكين الشباب',
            'description_en': 'Coordinate training programs for youth leaders and civil society activists.',
            'description_ar': 'تنسيق برامج تدريبية لقادة الشباب وناشطي المجتمع المدني.',
            'requirements_en': 'BA/BS, project management exp, passion for human rights.',
            'requirements_ar': 'بكالوريوس, خبرة إدارة مشاريع, شغف بحقوق الإنسان.',
            'apply_info_en': 'Email CV to jobs@riadseiflb.org subject "Program Coordinator".',
            'apply_info_ar': 'أرسل CV إلى jobs@riadseiflb.org بعنوان "منسق برامج".',
        },
    ]
    
    for job_data in jobs_data:
        job, created = Job.objects.get_or_create(
            title_en=job_data['title_en'],
            defaults=job_data
        )
        if created:
            print(f"✓ Created job: {job.title_en}")
        else:
            print(f"- Job exists: {job.title_en}")

def run():
    """Main function to run all seed operations."""
    print("\n🌱 Seeding database...\n")
    
    create_superuser()
    create_site_settings()
    create_publications()
    create_events()
    create_news()
    create_jobs()
    
    print("\n✅ Database seeding complete!\n")
    print("You can now login to /admin with:")
    print("  Username: riadseifadmin")
    print("  Password: riadseif123")
    print("\n⚠️  Remember to change the password in production!\n")

if __name__ == '__main__':
    run()
