from rest_framework import serializers
from .models import Song, User, Rating
from django.db.models import Avg

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','password')

class RatingSerializer(serializers.ModelSerializer):
    # song= serializers.CharField(source='song_id.song', read_only=True)
    # artist = serializers.CharField(source='song_id.artist', read_only=True)
    class Meta:
        model = Rating
        fields = ("id","song_id","username","rating")

class SongSerializer(serializers.ModelSerializer):
    ratings = serializers.SlugRelatedField(
        source='song_id',
        slug_field='rating',
        many=True,
        read_only=True
    )

    class Meta:
        model = Song
        depth = 1
        fields = ("id","song","artist",'ratings')

# For each album object, tracks should be fetched from database


