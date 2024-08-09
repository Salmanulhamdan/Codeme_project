from django.urls import include, path
from .views import Signup,Login,GetUserView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('signup', Signup.as_view(), name='user-signup'),
    path('login', Login.as_view(), name='user-login'),
    path('user',GetUserView.as_view(),name='user'),
    path('refresh', TokenRefreshView.as_view(), name='token_refresh'),



]