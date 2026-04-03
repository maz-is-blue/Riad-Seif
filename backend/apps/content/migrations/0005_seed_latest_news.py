from datetime import date

from django.db import migrations


def seed_latest_news(apps, schema_editor):
    NewsUpdate = apps.get_model("content", "NewsUpdate")

    seed_rows = [
        {
            "title_en": "Transitional Justice Mechanisms in Post-Conflict Syria",
            "title_ar": "آليات العدالة الانتقالية في سوريا ما بعد النزاع",
            "summary_en": "A comprehensive analysis of legal frameworks required for accountability.",
            "summary_ar": "تحليل شامل للأطر القانونية المطلوبة للمساءلة.",
            "published_date": date(2024, 12, 1),
        },
        {
            "title_en": "Women's Role in Constitutional Reform",
            "title_ar": "دور المرأة في الإصلاح الدستوري",
            "summary_en": "Examining the importance of women's participation in drafting the new constitution.",
            "summary_ar": "دراسة أهمية مشاركة المرأة في صياغة الدستور الجديد.",
            "published_date": date(2024, 11, 1),
        },
        {
            "title_en": "Legal Advocacy Toolkit for Practitioners",
            "title_ar": "مجموعة أدوات المناصرة القانونية للممارسين",
            "summary_en": "Practical guide for lawyers working on human rights cases.",
            "summary_ar": "دليل عملي للمحامين العاملين في قضايا حقوق الإنسان.",
            "published_date": date(2024, 10, 1),
        },
    ]

    for row in seed_rows:
        exists = NewsUpdate.objects.filter(title_en=row["title_en"]).exists() or NewsUpdate.objects.filter(
            title_ar=row["title_ar"]
        ).exists()
        if exists:
            continue

        NewsUpdate.objects.create(
            title_en=row["title_en"],
            title_ar=row["title_ar"],
            summary_en=row["summary_en"],
            summary_ar=row["summary_ar"],
            content_en=row["summary_en"],
            content_ar=row["summary_ar"],
            published_date=row["published_date"],
            is_published=True,
            is_featured=True,
        )


def noop_reverse(apps, schema_editor):
    # Intentionally no-op to avoid deleting manually managed content.
    pass


class Migration(migrations.Migration):
    dependencies = [
        ("content", "0004_job"),
    ]

    operations = [
        migrations.RunPython(seed_latest_news, noop_reverse),
    ]

