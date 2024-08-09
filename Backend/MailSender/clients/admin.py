from django.contrib import admin
from .models import Client,Broadcast,Message
# Register your models here.
admin.site.register(Client)
admin.site.register(Broadcast)
admin.site.register(Message)
