from django.urls import path
from .views import main, CreateWeddingView, CreateGuestView, WeddingView, GuestView

urlpatterns = [
    path('', main),
    path('create-wedding', CreateWeddingView.as_view()),
    # path('create-table', CreateTableView.as_view()),
    path('create-guest', CreateGuestView.as_view()),
    path('weddings', WeddingView.as_view()),
    path('guests', GuestView.as_view()),
]
