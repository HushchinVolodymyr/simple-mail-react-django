# Generated by Django 4.2.7 on 2023-12-05 21:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_alter_user_mail_adress'),
    ]

    operations = [
        migrations.AlterField(
            model_name='email',
            name='body',
            field=models.CharField(max_length=1000),
        ),
        migrations.AlterField(
            model_name='email',
            name='recipiend',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='email',
            name='send_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='email',
            name='sender',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='email',
            name='theme',
            field=models.CharField(max_length=255),
        ),
    ]
