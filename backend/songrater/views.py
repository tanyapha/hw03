from django.shortcuts import render
from rest_framework import viewsets
from .serializer import SongSerializer,RatingSerializer
from .models import Song,Rating
from django.db.models import Avg
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.decorators import api_view

class RatingView(viewsets.ModelViewSet):
    serializer_class = RatingSerializer
    queryset = Rating.objects.all()
    filter_fields = ('username','song_id')

class SongView(viewsets.ModelViewSet):
    serializer_class = SongSerializer
    queryset = Song.objects.all()

    @action(detail=False, methods=['get'], name='Get Average')
    def get_average(self, request):
        avg_rating = Song.objects.annotate(avg_rating=Avg('song_id__rating'))
        return Response(avg_rating)

