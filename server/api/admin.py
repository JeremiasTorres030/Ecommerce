from django.contrib import admin
from api.models import ProductModel, CustomUserModel

# Register your models here.

admin.site.register(ProductModel)
admin.site.register(CustomUserModel)

