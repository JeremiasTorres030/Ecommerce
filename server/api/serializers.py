from api.models import ProductModel
from rest_framework.serializers import ModelSerializer

class ProductSerializer (ModelSerializer):
    class Meta:
        model=ProductModel
        fields = "__all__"


