from django.db import models


class User(models.Model):
    # Username (primary key)
    name = models.CharField(max_length=64, null=False, primary_key=True)
    # Unique token for authentication
    uniq_token = models.CharField(max_length=255, null=False)
    # Email address (nullable)
    mail_adress = models.CharField(null=True)
    # Password (hashed)
    password = models.CharField(null=False)

    def __repr__(self):
        return f"Name: {self.name}\tEmail: {self.mail_adress}"



class Email(models.Model):
    # Sender's name
    sender = models.CharField(null=False, max_length=255)
    # Recipient's name
    recipiend = models.CharField(null=False, max_length=255)
    # Email theme
    theme = models.CharField(max_length=255)
    # Email body
    body = models.CharField(max_length=1000)
    # Date and time when the email was sent (auto-generated)
    send_date = models.DateTimeField(auto_now=True)
    # Flag indicating whether the email has been read (default is False)
    is_read = models.BooleanField(default=False, null=False)


    def __repr__(self):
        return f"Email: {self.theme}"


