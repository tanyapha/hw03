from tkinter import CASCADE
from turtle import mode
from django.db import models

class User(models.Model):
    username = models.CharField(max_length=255, 
                                primary_key=True,
                                unique=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.username

class Rating(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255)
    song = models.CharField(max_length = 255)
    artist = models.CharField(max_length = 255)
    rating = models.IntegerField()