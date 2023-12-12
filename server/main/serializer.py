from rest_framework import serializers
from .models import User, Email


class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = ['sender', 'recipiend', 'theme', 'body', 'send_date', 'is_read']