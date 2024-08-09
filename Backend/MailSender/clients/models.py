from django.db import models
from users.models import Account

# Create your models here.

class Client(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    place = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name
    

class Broadcast(models.Model):
    name = models.CharField(max_length=100)
    clients = models.ManyToManyField(Client, related_name='broadcasts')

class Message(models.Model):
    unique_id = models.CharField(max_length=255,default=None)
    subject = models.CharField(max_length=255)
    body = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, null=True, blank=True)
    broadcast = models.ForeignKey(Broadcast, on_delete=models.CASCADE, null=True, blank=True)
    sender = models.ForeignKey(Account, on_delete=models.CASCADE)

    class Meta:
        ordering = ('sent_at',)