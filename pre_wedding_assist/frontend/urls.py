from django.urls import path
from .views import index
urlpatterns = [
    path('', index),
    path('login', index),
    path('createGuest', index),
    path('editGuest/<int:id>/', index),
    path('editTable/<int:id>/', index),
    path('createTable/', index),
    path('home/', index),
    path('guest/<int:id>/', index),
    path('table/<int:id>/', index),
    path('assignGuestToTable/', index),
    path('displayTables/', index),
    path('getGuestsForTable/<int:table_number>/', index),
    path('showVenue', index),
]