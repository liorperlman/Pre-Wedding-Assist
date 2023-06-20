from django.urls import path
from .views import index
urlpatterns = [
    path('', index),
    path('login', index),
    path('createGuest', index),
    path('createTable/', index),
    path('home/', index),
    path('guest/<int:id>', index),
    path('table/<int:id>', index)
]