from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import WeddingSerializer, GuestSerializer, CreateWeddingSerializer, CreateTableSerializer, CreateGuestSerializer
from .models import Wedding, Guest
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
def main(request):
    return HttpResponse("<h1>Hello</h1>")

def create_guest(request):
    return HttpResponse("<h1>create guest</h1>")

class WeddingView(generics.ListAPIView):
    queryset = Wedding.objects.all()
    serializer_class = WeddingSerializer
    
class GuestView(generics.ListAPIView):
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer
    
class CreateWeddingView(APIView):
    serializer_class = CreateWeddingSerializer
    
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
            
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            date_of_wedding = serializer.data.get('date_of_wedding')
            host = self.request.session.session_key
            queryset = Wedding.objects.filter(host=host)
            if queryset.exists():
                wedding = queryset[0]
                wedding.date_of_wedding = date_of_wedding
                wedding.save(update_fields=['date_of_wedding'])
            else:
                wedding = Wedding(host=host, date_of_wedding=date_of_wedding)
                wedding.save()
            
            return Response(WeddingSerializer(wedding).data, status=status.HTTP_)

class CreateGuestView(APIView):
    serializer_class = CreateGuestSerializer
    
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
            
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            quantity = serializer.data.get('quantity')
            group = serializer.data.get('group')
            phone_number = serializer.data.get('phone_number')
            is_attending = serializer.data.get('is_attending')
            table = serializer.data.get('table')
            
            guest = Guest(name=name, quantity=quantity, group=group, phone_number=phone_number, is_attending=is_attending, table=table)
            guest.save()
            
            return Response(GuestSerializer(guest).data, status=status.HTTP_201_CREATED)
        # return Response('outside of the if statement')