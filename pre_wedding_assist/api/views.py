from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import WeddingSerializer, TableSerializer, GuestSerializer, CreateWeddingSerializer, CreateTableSerializer, CreateGuestSerializer
from .models import Wedding, Table, Guest
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
    
class TableView(generics.ListAPIView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    
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
            
            return Response(WeddingSerializer(wedding).data, status=status.HTTP_201_CREATED)

class CreateTableView(APIView):
    serializer_class = CreateTableSerializer
    
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
            
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            capacity = serializer.data.get('capacity')
            wedding = serializer.data.get('wedding')
            
            table = Table(capacity=capacity, wedding=wedding)
            table.save()
            
            return Response(TableSerializer(table).data, status=status.HTTP_201_CREATED)
        #return Response('outside of the if statement')
        
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
        
class EditGuestView(APIView):
    serializer_class = GuestSerializer
    lookup_url_kwarg = 'id'
    
    def post(self, request, format=None, id=None):
        id = request.data.get(self.lookup_url_kwarg)
        if id != None:
            guest = Guest.objects.get(id=id)
            serializer = self.serializer_class(guest, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({'Guest Not Found': 'Invalid Guest Id'},status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Id paramater not found in request'},status=status.HTTP_400_BAD_REQUEST)

class GetGuest(APIView):
    serializer_class = GuestSerializer
    lookup_url_kwarg = 'id'
    
    def get(self, request, format=None):
        id = request.GET.get(self.lookup_url_kwarg)
        
        if id != None:
            guest = Guest.objects.filter(id=id)
            if len(guest) > 0:
                data = GuestSerializer(guest[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Guest Not Found': 'Invalid Guest Id'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'Bad Request': 'Id paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)
    
class GetTable(APIView):
    serializer_class = TableSerializer
    lookup_url_kwarg = 'id'
    
    def get(self, request, format=None):
        id = request.GET.get(self.lookup_url_kwarg)
        
        if id != None:
            table = Table.objects.filter(id=id)
            if len(table) > 0:
                data = TableSerializer(table[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Table Not Found': 'Invalid Table Id'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'Bad Request': 'Id paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)
    
class AssignGuestToTableView(APIView):
    serializer_class = GuestSerializer
    lookup_url_kwarg = 'id'
    
    def post(self, request, format=None, id=None):
        id = request.data.get(self.lookup_url_kwarg)
        if id != None:
            guest = Guest.objects.get(id=id)
            serializer = self.serializer_class(guest, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({'Guest Not Found': 'Invalid Guest Id'},status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Id paramater not found in request'},status=status.HTTP_400_BAD_REQUEST)