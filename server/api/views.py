from api.models import ProductModel
from api.serializers import ProductSerializer , UnicUserSerializer,UserSerializer
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.auth import AuthToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User  
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication
from rest_framework.parsers import MultiPartParser
# Create your views here.


class ProductName(APIView):
    def get(self,request,format=None, productName=""):
        producto = ProductModel.objects.filter(name__contains=productName)
        serializer = ProductSerializer(producto,many=True)
        if serializer.is_valid:
            return Response({
                'data':serializer.data,
                "ok":True
            },status=status.HTTP_200_OK)
        return Response({"msg":"Hubo un error","ok":False},status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UnicProductView(APIView):
    def get(self,request,format=None, productId=""):
        producto = ProductModel.objects.filter(id=productId)
        serializer = ProductSerializer(producto,many=True)
        if serializer.is_valid and producto:
            return Response({"data":serializer.data,"ok":True},status=status.HTTP_200_OK)
        return Response({"msg":"Hubo un error en el servidor",'ok':False},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def delete(self,request,format=None,productId=""):
        authentication_classes = (TokenAuthentication,)
        permission_classes = (IsAuthenticated,)
        product = ProductModel.objects.filter(id=productId)
        if product:
            product.delete()
            return Response({
                "msg":"Producto eliminado con exito",
                "ok":True
            },status=status.HTTP_200_OK)

        return Response({
            "msg":"Hubo un error",
            'ok':False
        },status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CategoryView(APIView):
    def get(self,request,format=None , categoryName=""):
        producto = ProductModel.objects.filter(category = categoryName)
        serializer = ProductSerializer(producto,many=True)
        if serializer.is_valid:
            return Response({'data':serializer.data,"ok":True},status=status.HTTP_200_OK)
        return Response({"msg":"Hubo un error","ok":False},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SubCategoryView(APIView):
    def get(self,request,format=None , subCategoryName=""):
        producto = ProductModel.objects.filter(sub_category = subCategoryName)
        serializer = ProductSerializer(producto,many=True)
        if serializer.is_valid :
            return Response({'data':serializer.data,"ok":True},status=status.HTTP_200_OK)
        return Response({"msg":"Hubo un error","ok":False},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserProductsView(APIView):
    def get(self,request,format=None , userId=""):
        producto = ProductModel.objects.filter(seller = userId)
        serializer = ProductSerializer(producto,many=True)
        if serializer.is_valid:
            return Response({'data':serializer.data,"ok":True},status=status.HTTP_200_OK)
        return Response({"msg":"Hubo un error","ok":False},status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UnicUserView(APIView):
    def get(self,request,format=None,userId=""):
        user = User.objects.filter(id = userId)
        serializer = UnicUserSerializer(user,many=True)
        if serializer.is_valid :
            return Response({'data':serializer.data,"ok":True},status=status.HTTP_200_OK)
        return Response({"msg":"Hubo un error","ok":False},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

    def put(self,request,format=None, userId=""):
        authentication_classes = (TokenAuthentication,)
        permission_classes = (IsAuthenticated,)
        user = User.objects.filter(id = userId)
        user_username = User.objects.filter(username=request.data['username'])
        user_email = User.objects.filter(email=request.data['email'])
        if user:
            if user_username.__len__() != 0 and request.data["username"] != user_username[0].username:
                return Response({
                    "ok":False,
                    "msg":"El nombre de usuario ya existe."
                },status=status.HTTP_226_IM_USED)
            if user_email.__len__() != 0 and request.data["email"] != user_email[0].email:
                return Response({
                    "ok":False,
                    "msg":"El correo ya esta en uso."
                },status=status.HTTP_226_IM_USED)
            
            user.update(first_name = request.data['first_name'],last_name = request.data['last_name'],username = request.data['username'],email = request.data['email'])
            return Response({"msg":"Usuario editado con exito", "ok":True},status=status.HTTP_200_OK)
        
        return Response({"msg":"Hubo un error", "ok":False},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserView(APIView):
    def post(self,request,format=None):
        request.data["password"] = make_password(request.data['password'])
        user_username = User.objects.filter(username=request.data['username'])
        user_email = User.objects.filter(email=request.data['email'])
        if user_username.__len__() != 0:
            return Response({
                "ok":False,
                "msg":"El nombre de usuario ya existe."
            },status=status.HTTP_226_IM_USED)
        if user_email.__len__() != 0:
            return Response({
                "ok":False,
                "msg":"El correo ya esta en uso."
            },status=status.HTTP_226_IM_USED)
        
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"ok":True,"msg":"Usuario creado con exito"},status=status.HTTP_201_CREATED)
        return Response({"msg":"Hubo un error", "ok":False},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

class UserLoginView(APIView):
    def post(self,request,format=None):
        serializer = AuthTokenSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data['user']
            _,token = AuthToken.objects.create(user)
            return Response({
                    "user":{
                    "first_name":user.first_name,
                    "last_name":user.last_name,
                    "username":user.username,
                    "email":user.email,
                    "id":user.id
                    },
                    "token":token
                },status=status.HTTP_200_OK)
        return Response({"msg":"El nombre de usuario o la contraseña son incorrectos", "ok":False},status=status.HTTP_404_NOT_FOUND)
        
class UserTokenView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get(self,request,format=None):
        return Response({
                    "username":request.user.username,
                    "first_name":request.user.first_name,
                    "last_name":request.user.last_name,
                    "email":request.user.email,
                    "id":request.user.id,
                }, status=status.HTTP_200_OK)
class ProductView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    parser_classes = [MultiPartParser]
    def post(self,request,format=None):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({
                'ok':True,
                "msg":"Producto creado con exito"
            },status=status.HTTP_201_CREATED)
        return Response({
            "msg":"Hubo un error",
            "ok":False
        },status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self,request,format=None):        
            return Response({
                "ok":True,
                "msg":"Producto editado con exito"
            },status=status.HTTP_200_OK)





