from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("forum", "0002_memory_archive"),
    ]

    operations = [
        migrations.CreateModel(
            name="ForumSession",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title_en", models.CharField(max_length=255)),
                ("title_ar", models.CharField(max_length=255)),
                ("youtube_url", models.URLField()),
                ("date", models.CharField(blank=True, max_length=50)),
                ("is_published", models.BooleanField(default=True)),
                ("order", models.PositiveIntegerField(default=0)),
            ],
            options={
                "verbose_name": "Forum Session",
                "verbose_name_plural": "Forum Sessions",
                "ordering": ["order", "id"],
            },
        ),
    ]
