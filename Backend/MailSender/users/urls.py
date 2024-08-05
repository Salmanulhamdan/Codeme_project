from django.urls import include, path
from .views import Signup,Login


urlpatterns = [
    path('signup', Signup.as_view(), name='user-signup'),
    path('login', Login.as_view(), name='user-login'),

]