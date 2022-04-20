from pyexpat import model
from django.db.models.deletion import CASCADE
from django.db import models

class User(models.Model):
    username = models.CharField(max_length=255, 
                                primary_key=True,
                                unique=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.username

class Song(models.Model):
    id = models.AutoField(primary_key=True)
    song = models.CharField(max_length = 255)
    artist = models.CharField(max_length = 255)

class Rating(models.Model):
    id = models.AutoField(primary_key=True)
    song_id = models.ForeignKey(Song, on_delete = models.CASCADE, related_name="song_id")
    username = models.CharField(max_length=255)
    rating = models.IntegerField()