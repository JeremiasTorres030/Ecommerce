from api.models import ProductModel
from api.serializers import ProductSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.


class ProductView(APIView):
    def get(self,request,format=None):
        producto = ProductModel.objects.all()
        serializer = ProductSerializer(producto,many=True)
        return Response(serializer.data)



class CategoryView(APIView):
    def get(self,request,format=None , categoryName=""):
        producto = ProductModel.objects.filter(category = categoryName)
        serializer = ProductSerializer(producto,many=True)
        return Response(serializer.data)
