from rest_framework import viewsets,status
from .models import Client,Broadcast,Message
from .serializers import ClientSerializer,BroadcastSerializer
from rest_framework.permissions import IsAuthenticated
from .serializers import MessageSerializer
from django.core.mail import send_mail
from rest_framework.response import Response
import uuid


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

class BroadcastViewSet(viewsets.ModelViewSet):
    queryset = Broadcast.objects.all()
    serializer_class = BroadcastSerializer
    permission_classes = [IsAuthenticated]


class PersonalMessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.filter(broadcast__isnull=True)
    serializer_class = MessageSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        sender = request.user
        print(data)
        print(sender.email)

        if 'client' not in data:
            return Response({'error': 'Client must be specified for personal emails'}, status=status.HTTP_400_BAD_REQUEST)
        
        client = Client.objects.get(id=data['client'])
        unique_id = str(uuid.uuid4())
        message = Message.objects.create(
            unique_id=unique_id,
            subject=data['subject'],
            body=data['body'],
            client=client,
            sender=sender
        )
        send_mail(
            message.subject,
            message.body,
            sender.email,
            [client.email]
        )
        serializer = self.get_serializer(message)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

class BroadcastMessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.filter(client__isnull=True)
    serializer_class = MessageSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        sender = request.user


        if 'broadcast' not in data:
            return Response({'error': 'Broadcast must be specified for broadcast emails'}, status=status.HTTP_400_BAD_REQUEST)

        broadcast = Broadcast.objects.get(id=data['broadcast'])
        messages = []
        unique_id = str(uuid.uuid4())
        for client in broadcast.clients.all():
            message = Message.objects.create(
                unique_id=unique_id,
                subject=data['subject'],
                body=data['body'],
                broadcast=broadcast,
                client=client,
                sender=sender
            )
            send_mail(
                message.subject,
                message.body,
                sender.email,
                [client.email]
            )
            messages.append(message)
        
        serializer = self.get_serializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    



class PersonalMessageListViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = MessageSerializer

    def get_queryset(self):
        queryset = Message.objects.filter(broadcast__isnull=True)
        client_id = self.request.query_params.get('client', None)
        if client_id is not None:
            queryset = queryset.filter(client_id=client_id)
        return queryset
    

class BroadcastMessageListViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = MessageSerializer

    def get_queryset(self):
        queryset = Message.objects.filter(broadcast__isnull=False)
        
        broadcast_id = self.request.query_params.get('broadcast', None)
        if broadcast_id is not None:
            queryset = queryset.filter(broadcast_id=broadcast_id).distinct()
            print(queryset,"messages")
        return queryset