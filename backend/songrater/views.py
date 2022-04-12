from django.shortcuts import render
from rest_framework import viewsets
from .serializer import UserSerializer,RatingSerializer
from .models import User,Rating
from django.db.models import Avg
from rest_framework.decorators import action
from rest_framework.response import Response


# Create your views here.
#class UserView(viewsets.ModelViewSet):
#    serializer_class = UserSerializer
#    queryset = User.objects.all()


class RatingView(viewsets.ModelViewSet):
    serializer_class = RatingSerializer
    queryset = Rating.objects.all()
    filter_fields = ('username', 'song')

    @action(detail=False, methods=['get'], name='Get Average')
    def get_average(self, request):
        avg_rating = Rating.objects.values("song","artist").annotate(rating=Avg('rating'))
        return Response(avg_rating)