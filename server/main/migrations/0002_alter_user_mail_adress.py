# Generated by Django 4.2.7 on 2023-11-29 19:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='mail_adress',
            field=models.CharField(null=True),
        ),
    ]
