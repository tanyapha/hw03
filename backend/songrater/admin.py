from django.contrib import admin
from .models import User, Rating

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ["username"]

admin.site.register(User,UserAdmin)

class RatingAdmin(admin.ModelAdmin):
    list_display = ["id","username","song","artist","rating"]

admin.site.register(Rating,RatingAdmin)