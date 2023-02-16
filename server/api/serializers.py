from api.models import ProductModel
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User  


class ProductSerializer (ModelSerializer):
    class Meta:
        model=ProductModel
        fields = "__all__"

class UnicUserSerializer (ModelSerializer):
    class Meta:
        model=User
        fields = ['username']

class UserSerializer (ModelSerializer):
    class Meta:
        model=User
        fields = "__all__"
