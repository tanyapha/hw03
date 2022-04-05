from django.shortcuts import render
from rest_framework import viewsets
from .serializer import UserSerializer,RatingSerializer
from .models import User,Rating

# Create your views here.
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class RatingView(viewsets.ModelViewSet):
    serializer_class = RatingSerializer
    queryset = Rating.objects.all()