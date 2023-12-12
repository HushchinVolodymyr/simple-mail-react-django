from django.urls import path
from .views import (LoginPage, RegisterPage, BoxPage,
                    Header, SignOut, WriteMail, SendedMail,
                    RecivedMail)

urlpatterns = [
    path('login/', LoginPage.as_view()),
    path('register/', RegisterPage.as_view()),
    path('header/', Header.as_view()),
    path('signout/', SignOut.as_view()),
    path('box/', BoxPage.as_view()),
    path('write/', WriteMail.as_view()),
    path('sendedmail/', SendedMail.as_view()),
    path('recivemail/', RecivedMail.as_view()),
]


