from django.db import models
import string

# Create your models here.
class Wedding(models.Model):
    host = models.CharField(max_length=50, unique=True)
    date_of_wedding = models.DateTimeField(unique=True, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return "Host: " + self.host

class Table(models.Model):
    capacity = models.IntegerField(default=2, null=False)
    wedding = models.ForeignKey(Wedding, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return "Table capacity: " + str(self.capacity)
    

class Guest(models.Model):
    name = models.CharField(max_length=50, unique=True)
    quantity = models.IntegerField(default=1, null=False)
    group = models.CharField(max_length=50, default='')
    phone_number = models.CharField(max_length=20, default='', unique=True)
    is_attending = models.BooleanField()
    table = models.ForeignKey(Table, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return "Name: " + self.name + ", Quantity: " + str(self.quantity)
    
    