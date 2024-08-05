from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import AccountSerializer,Login_serializer_user
from .models import Account
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.authentication import authenticate
class Signup(APIView):
    permission_classes = [AllowAny]
    serializer_class = AccountSerializer

    def post(self, request, format=None):
        try:
            """
            Create a new user, receive request.data and serialize it. If validated,
            create a new user and return newly generated JWT access and refresh tokens.
            """
            # Serializing request.data
            serializer = self.serializer_class(data=request.data)
            
            if serializer.is_valid(raise_exception=True):
                
                """
                If the data is validated, the password is hashed, and a new user is created.
                Return with generated JWT tokens.
                """

                user = Account.objects.create_user(
                        name=serializer.validated_data["name"],
                        email=serializer.validated_data["email"],
                        password=serializer.validated_data["password"],
                    )
       
                
                response_data = serializer.data
                response_data.pop('password')
                
                return Response(response_data, status=201)
        except serializers.ValidationError as e:
            error_messages = []

            for field, errors in e.detail.items():
                field_errors = ', '.join([f"{field}: {str(error)}" for error in errors])
                error_messages.append(field_errors)

            error_message = ', '.join(error_messages)
                    
            return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        

# login
class Login(APIView):
  
    serializer_class = Login_serializer_user
    permission_classes = [AllowAny]

    def post(self, reuqest, format=None):
        """
        validating the user credencials and generating access and refresh
        jwt tocken if the user is validated otherwise return error message
        """

        # serializing data
        seriazed_data = self.serializer_class(data=reuqest.data)

        # validating credencians, if credencials invalied error message
        # automatically send to frond end
        if seriazed_data.is_valid(raise_exception=True):
  
            # fetching credencials for validation
            email = seriazed_data.validated_data['email']
            password = seriazed_data.validated_data['password']
            # user1=CustomUser.objects.get(email=email)
            # username=user1.username
    
            # authenticate func returns user instence if authenticated
            user = authenticate(email=email, password=password)
            # if user is authenticated generate jwt
            if user is not None:
                # generating jwt tocken
                refresh = RefreshToken.for_user(user)
                refresh['email'] = user.email
                refresh['is_superuser'] = user.is_superuser
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)
         
                # returning response with access and refresh tocken
                # refresh tocken used to generate new tocken before tockens session expired
                return Response(
                    {
                        "email": email,
                        "password": password,
                        "access": access_token,
                        "refresh": refresh_token,
                       
                    },
                    status=201,
                )

            # if user none, wrong email or passord
            else:
                return Response({"details": "wrong email or password"}, status=401)