# Generated by Django 5.0.7 on 2024-08-09 04:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0007_message_unique_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='unique_id',
            field=models.CharField(default=None, max_length=255),
        ),
    ]
