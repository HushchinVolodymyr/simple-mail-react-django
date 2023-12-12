

from django.db import IntegrityError
from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from .models import User, Email
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password
from .serializer import EmailSerializer


# Create your views here.
class LoginPage(APIView):
    def post(self, request, *args, **kwargs):
        # Extracting login, token, and password from the request data
        login = request.data.get('login', '')
        token = request.data.get('token_log', '')
        password = request.data.get('password', '')

        try:
            # Checking if the user with the provided login exists
            user = User.objects.get(name=login)
        except User.DoesNotExist:
            # If user does not exist, return an error response
            response_data = {'status': 'error', 'message': 'User not found'}
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)

        # Retrieving stored password for the user
        stored_password = user.password
        print("Login: OK")

        # Checking if the provided password matches the stored password
        if check_password(password, stored_password):
            print("Password: OK")
            # If password is correct, update the user's unique token and return success
            user.uniq_token = token
            user.save()
            response_data = {'status': 'success', 'message': 'Data received successfully'}
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            # If password is incorrect, return an error response
            response_data = {'status': 'error', 'message': 'Incorrect password'}
            return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)


class RegisterPage(APIView):
    def post(self, request):
        # Extracting login, token, password, and confirm_password from the request data
        login = request.data.get('login', '')
        token = request.data.get('token_reg', '')
        password = request.data.get('password', '')
        confirm_password = request.data.get('confirm_password', '')

        # Creating a mail address based on the login
        mail_adress = str(login) + '@mail.com'

        # Checking if a user with the provided login already exists
        users = User.objects.filter(name=login)

        # Hashing the password
        hesh = make_password(password)

        if users.exists():
            # If user with the same login already exists, return an error response
            response_data = {"status": "error", "message": "User with this login already exists"}
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

        if password != confirm_password:
            # If password and confirm_password do not match, return an error response
            response_data = {"status": "error", "message": "Password and Confirm password do not match"}
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Creating a new user with the provided information
            user = User.objects.create(name=login, uniq_token=token, password=hesh, mail_adress=mail_adress)

            user.uniq_token = token
            user.save()

            # Return success response if user is created successfully
            response_data = {'status': 'success', 'message': 'User created successfully'}
            return Response(response_data, status=status.HTTP_200_OK)

        except IntegrityError as e:
            # If an IntegrityError occurs (e.g., user with the same login already exists), return an error response
            response_data = {"status": "error", "message": "User with this login already exists"}
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            # If an unexpected error occurs, return an error response
            print(e)
            response_data = {"status": "error", "message": "An error occurred while creating the user"}
            return Response(response_data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BoxPage(APIView):
    def post(self, request):
        # Extracting the token from the request data
        token = request.data.get('token', '')

        print("Token: ", token)

        try:
            # Trying to retrieve the user with the provided token
            user = User.objects.get(uniq_token=token)
        except User.DoesNotExist:
            # If user does not exist, return an error response
            response_data = {"status": "error", "message": "User doesn't exist"}
            print("Error: User doesn't exist")
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

        # Retrieving the user's login name
        login = user.name

        # Retrieving and serializing sent and received emails, then sorting them by send_date in descending order
        sender_mails = Email.objects.filter(sender=login).order_by('send_date')
        serialized_sender_mails = EmailSerializer(sender_mails, many=True).data
        recipiend_mails = Email.objects.filter(recipiend=login).order_by('send_date')
        serialized_recipiend_mails = EmailSerializer(recipiend_mails, many=True).data

        # Combining and sorting all mails by send_date in descending order
        response_data = sorted(
            serialized_sender_mails + serialized_recipiend_mails,
            key=lambda x: x.get('send_date', ''),
            reverse=True
        )

        if not response_data:
            # If there are no emails, return an error response
            response_data = {"status": "error", "message": "Empty mail box"}
            print("Emails: ", response_data.get('status', ''))
            return Response(response_data, status=status.HTTP_200_OK)

        return Response(response_data, status=status.HTTP_200_OK)


class SendedMail(APIView):
    def post(self, request):
        # Extracting the token from the request data
        token = request.data.get('token', None)

        try:
            # Trying to retrieve the user with the provided token
            user = User.objects.get(uniq_token=token)
        except User.DoesNotExist:
            # If user does not exist, return an error response
            response_data = {"status": "error", "message": "User doesn't exist"}
            print("Error: User doesn't exist")
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

        # Retrieving and serializing sent emails, then sorting them by send_date in descending order
        sender_mails = Email.objects.filter(sender=user.name).order_by('-send_date')
        response_data = EmailSerializer(sender_mails, many=True).data

        if not response_data:
            # If there are no sent emails, return an error response
            response_data = {"status": "error", "message": "Empty mail box"}
            print("Emails: ", response_data.get('status', ''))
            return Response(response_data, status=status.HTTP_200_OK)

        print(response_data)
        return Response(response_data, status=status.HTTP_200_OK)


class RecivedMail(APIView):
    def post(self, request):
        # Extracting the token from the request data
        token = request.data.get('token', None)

        try:
            # Trying to retrieve the user with the provided token
            user = User.objects.get(uniq_token=token)
        except User.DoesNotExist:
            # If user does not exist, return an error response
            response_data = {"status": "error", "message": "User doesn't exist"}
            print("Error: User doesn't exist")
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

        # Retrieving and serializing received emails, then sorting them by send_date in descending order
        recipiend_mails = Email.objects.filter(recipiend=user.name).order_by('-send_date')
        response_data = EmailSerializer(recipiend_mails, many=True).data

        if not response_data:
            # If there are no received emails, return an error response
            response_data = {"status": "error", "message": "Empty mail box"}
            print("Emails: ", response_data.get('status', ''))
            return Response(response_data, status=status.HTTP_200_OK)

        print(response_data)
        return Response(response_data, status=status.HTTP_200_OK)


class WriteMail(APIView):
    def post(self, request):
        # Extracting the necessary data from the request
        token = request.data.get('token', None)
        recipient_name = request.data.get('recipiend', None)
        theme = request.data.get('theme', None)
        body = request.data.get('body', None)

        print(token, recipient_name, theme, body)

        try:
            # Trying to retrieve the recipient and sender users
            recipient = get_object_or_404(User, name=recipient_name)
            sender = get_object_or_404(User, uniq_token=token)

            # Creating an Email object
            mail = Email.objects.create(sender=sender.name, recipiend=recipient.name, theme=theme, body=body)

            print("Mail created successfully: ", mail)

            response_data = {'status': 'success', 'message': 'Mail successfully created'}
            return Response(response_data, status=status.HTTP_201_CREATED)
        except User.DoesNotExist:
            # If recipient user does not exist, return an error response
            print("User Error: Recipient doesn't exist")
            response_data = {"status": "error", "message": "Recipient doesn't exist!"}
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError as e:
            # If there's an integrity error, return an error response
            print("Create error: ", e)
            response_data = {"status": "error", "message": "Can't create message"}
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Handle other exceptions and return an error response
            print("Unexpected error: ", e)
            response_data = {"status": "error", "message": "Unexpected error"}
            return Response(response_data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class Header(APIView):
    def post(self, request):
        # Extracting the token from the request data
        token = request.data.get('token', '')

        try:
            # Trying to retrieve the user with the provided token
            user = User.objects.get(uniq_token=token)
        except User.DoesNotExist:
            # If user does not exist, return an error response
            response_data = {'status': 'error', 'message': 'User not found'}
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)

        # Creating a response with user information
        response_data={'status': 'success', 'message': 'User found', 'name': f'{user.name}'}
        return Response(response_data, status=status.HTTP_200_OK)


class SignOut(APIView):
    def post(self, request):
        # Extracting the token from the request data
        token = request.data.get('token', '')

        try:
            # Trying to retrieve the user with the provided token
            user = User.objects.get(uniq_token=token)
            # Clearing the user's unique token and saving the user object
            user.uniq_token = ''
            user.save()
        except User.DoesNotExist:
            # If user does not exist, return an error response
            response_data = {'status': 'error', 'message': 'User not found'}
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)

        # Creating a success response with user information
        response_data={'status': 'success', 'message': 'User found', 'name': f'{user.name}'}
        return Response(response_data, status=status.HTTP_200_OK)





