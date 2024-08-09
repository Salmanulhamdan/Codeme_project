from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClientViewSet,BroadcastViewSet,PersonalMessageViewSet,BroadcastMessageViewSet,PersonalMessageListViewSet,BroadcastMessageListViewSet

router = DefaultRouter()
router.register(r'clients', ClientViewSet)
router.register(r'broadcasts', BroadcastViewSet)
router.register(r'personal-messages', PersonalMessageViewSet, basename='personal-message')
router.register(r'broadcast-messages', BroadcastMessageViewSet, basename='broadcast-message')
router.register(r'personal-messages-list', PersonalMessageListViewSet, basename='personal-message-list')
router.register(r'broadcast-messages-list', BroadcastMessageListViewSet, basename='broadcast-message-list')


urlpatterns = [
    path('', include(router.urls)),
]