# Generated by Django 4.2.7 on 2023-11-20 13:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Email',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sender', models.CharField()),
                ('recipiend', models.CharField()),
                ('theme', models.CharField()),
                ('body', models.CharField()),
                ('send_date', models.CharField()),
                ('is_read', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('name', models.CharField(max_length=64, primary_key=True, serialize=False)),
                ('mail_adress', models.CharField()),
                ('password', models.CharField()),
            ],
        ),
    ]