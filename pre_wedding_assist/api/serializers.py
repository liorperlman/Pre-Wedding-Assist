from rest_framework import serializers
from .models import Wedding, Table, Guest, Stage

class WeddingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wedding
        fields = ('id', 'host', 'date_of_wedding', 'created_at')
   
                
class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = ('id', 'name', 'quantity', 'group', 'phone_number', 'is_attending', 'table', 'created_at')
       
class TableSerializer(serializers.ModelSerializer):
    guests = GuestSerializer(many=True, read_only=True)
    class Meta:
        model = Table
        fields = ('id', 'capacity', 'wedding', 'guests', 'x', 'y')
        
class StageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = ('id', 'name', 'x', 'y')        
        
class CreateWeddingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wedding
        fields = ('date_of_wedding')
        
class CreateTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ('capacity', 'wedding', 'x', 'y')

class CreateGuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = ('name', 'quantity', 'group', 'phone_number', 'is_attending', 'table')
        
class CreateStageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = ('name', 'x', 'y')