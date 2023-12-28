from django.urls import path
from .views import main, CreateWeddingView, CreateTableView, CreateGuestView, WeddingView, TableView, GuestView, GetGuest, GetTable, AssignGuestToTableView, EditGuestView, EditTableView, GetGuestsForTable

urlpatterns = [
    path('', main),
    path('create-wedding', CreateWeddingView.as_view()),
    path('create-table', CreateTableView.as_view()),
    path('create-guest', CreateGuestView.as_view()),
    path('weddings', WeddingView.as_view()),
    path('tables', TableView.as_view()),
    path('guests', GuestView.as_view()),
    path('get-guest', GetGuest.as_view()),
    path('get-table', GetTable.as_view()),
    path('assign-guest-to-table', AssignGuestToTableView.as_view()),
    path('edit-guest', EditGuestView.as_view()),
    path('edit-table', EditTableView.as_view()),
    path('get-guests-for-table', GetGuestsForTable.as_view()),

]
