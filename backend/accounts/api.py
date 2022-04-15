from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from knox.auth import TokenAuthentication
from .serializers import LoginSerializer, UserSerializer, RegisterSerializer, LoginSerializer

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        _, token = AuthToken.objects.create(user)
        #print(res.data.status)
        #print(console.log())
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': token # create a token for user
        })


# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
            
        user = serializer.validated_data
        return Response({
             'user': UserSerializer(user, context=self.get_serializer_context()).data,
             'token': AuthToken.objects.create(user)[1] # create a token for user
         })


# Get User API
class UserAPI(generics.RetrieveAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer
    #print('here')
    def get_object(self):
        return self.request.user