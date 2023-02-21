from api.models import ProductModel
from api.serializers import ProductSerializer , UnicUserSerializer,UserSerializer
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.auth import AuthToken
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User  
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
# Create your views here.


class ProductAllView(APIView):
    def get(self,request,format=None):
        producto = ProductModel.objects.all()
        serializer = ProductSerializer(producto,many=True)
        if serializer.is_valid:
            return Response(serializer.data)


class ProductView(APIView):
    def get(self,request,format=None, productId=""):
        producto = ProductModel.objects.filter(id=productId)
        serializer = ProductSerializer(producto,many=True)
        if serializer.is_valid:
            return Response(serializer.data)

class CategoryView(APIView):
    def get(self,request,format=None , categoryName=""):
        producto = ProductModel.objects.filter(category = categoryName)
        serializer = ProductSerializer(producto,many=True)
        if serializer.is_valid:
            return Response(serializer.data)

class UnicUserView(APIView):
    def get(self,request,format=None,userId=""):
        user = User.objects.filter(id = userId)
        serializer = UnicUserSerializer(user,many=True)
        if serializer.is_valid:
            return Response(serializer.data)

class UserView(APIView):
    def post(self,request,format=None):
        request.data["password"] = make_password(request.data['password'])
        user_username = User.objects.filter(username=request.data['username'])
        user_email = User.objects.filter(email=request.data['email'])
        if user_username.__len__() != 0:
            return Response({
                "ok":False,
                "msg":"El nombre de usuario ya existe."
            })
        if user_email.__len__() != 0:
            return Response({
                "ok":False,
                "msg":"El correo ya esta en uso."
            })
        
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"ok":True,"msg":"Usuario creado con exito"})


class UserLoginView(APIView):
    def post(self,request,format=None):
        serializer = AuthTokenSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data['user']
            _,token = AuthToken.objects.create(user)
            return Response({
                    "user":{
                    "username":user.username,
                    "id":user.id
                    },
                    "token":token
                })
        
class UserTokenView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get(self,request,format=None):
        return Response({
                    "username":request.user.username,
                    "id":request.user.id
                })
      