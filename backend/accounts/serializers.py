from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username')
# Login Serializer 
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        #print(data['username'])
        #print(data['password'])
        user = authenticate(username=data['username'],password=data['password'])
        #print(user)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','password')
        extra_kwargs = {'password':{'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


