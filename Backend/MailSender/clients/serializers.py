
from rest_framework import serializers
from .models import Client,Broadcast,Message

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'name', 'email', 'phone', 'place']


class BroadcastSerializer(serializers.ModelSerializer):
    class Meta:
        model = Broadcast
        fields = ['id', 'name', 'clients']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['unique_id','id', 'subject', 'body', 'sent_at', 'client', 'broadcast', 'sender']