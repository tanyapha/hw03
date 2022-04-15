from django.contrib import admin
from .models import Song, User, Rating

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ["username"]

admin.site.register(User,UserAdmin)

class SongAdmin(admin.ModelAdmin):
    list_display = ["id","song","artist"]
admin.site.register(Song,SongAdmin)

class RatingAdmin(admin.ModelAdmin):
    list_display = ["id","song_id","username","rating"]
admin.site.register(Rating,RatingAdmin)

