from api.models import ProductModel, CustomUserModel
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
import cloudinary
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
            product[0].image.delete()
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
        customUser = CustomUserModel.objects.filter(user = userId)
        serializer = UnicUserSerializer(user,many=True)
        if serializer.is_valid and customUser:
            serializer.data[0]['image'] = customUser[0].image.url
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
            if request.data['image'] != "null" and request.data['password'] != "null":
                customUserPassword = CustomUserModel.objects.filter(user = userId)
                new_imagePasword = f"{request.data['image']}{request.data['username']}"
                new_passwordImage = make_password(request.data["password"])
                customUserPassword[0].image.delete()
                imageUploadPassword = cloudinary.uploader.upload(request.data["image"], public_id=f'ecommer/images/{new_imagePasword}')
                customUserPassword.update(image=imageUploadPassword["public_id"])
                user.update(first_name = request.data['first_name'],last_name = request.data['last_name'],username = request.data['username'],email = request.data['email'],password = new_passwordImage)
                return Response({"msg":"Usuario editado con exito", "ok":True},status=status.HTTP_200_OK)
            if request.data['image'] != "null":
                customUser = CustomUserModel.objects.filter(user = userId)
                new_image = f"{request.data['image']}{request.data['username']}"
                customUser[0].image.delete()
                imageUpload = cloudinary.uploader.upload(request.data["image"], public_id=f'ecommer/images/{new_image}')
                customUser.update(image=imageUpload["public_id"])
                user.update(first_name = request.data['first_name'],last_name = request.data['last_name'],username = request.data['username'],email = request.data['email'])
                return Response({"msg":"Usuario editado con exito", "ok":True},status=status.HTTP_200_OK)
            if request.data["password"] != 'null':
                new_password = make_password(request.data["password"])
                user.update(first_name = request.data['first_name'],last_name = request.data['last_name'],username = request.data['username'],email = request.data['email'],password=new_password)
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
            user = User.objects.filter(id=serializer.data['id'])
            customUser = CustomUserModel.objects.create(user=user[0])
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
        customUser = CustomUserModel.objects.filter(user=request.user.id)
        return Response({
                    "username":request.user.username,
                    "first_name":request.user.first_name,
                    "last_name":request.user.last_name,
                    "email":request.user.email,
                    'image':customUser[0].image.url,
                    "id":request.user.id,
                }, status=status.HTTP_200_OK)
class ProductView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    parser_classes = [MultiPartParser]
    def post(self,request,format=None):
        serializer = ProductSerializer(data=request.data)
        if request.data['image'] == 'null':
            return Response({
                "ok":False,
                "msg": 'Ingrese la imagen de producto'
            },status=status.HTTP_400_BAD_REQUEST)
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
        product = ProductModel.objects.filter(id=request.data["id"])
        if product and request.data["image"] != 'null':
            image_name = f"{request.data['name']}{ request.data['id']}"
            product[0].image.delete()
            image = cloudinary.uploader.upload(request.data["image"], public_id=f'ecommer/images/{image_name}')
            product.update(image=image["public_id"],name=request.data["name"],sub_category=request.data['sub_category'],category=request.data['category'],price=request.data["price"])
            return Response({
                "ok":True,
                "msg":"Producto editado con exito"
            },status=status.HTTP_200_OK)
        if product and request.data['image'] == 'null':
            product.update(name=request.data["name"],sub_category=request.data['sub_category'],category=request.data['category'],price=request.data["price"])
            return Response({
                "ok":True,
                "msg":"Producto editado con exito"
            },status=status.HTTP_200_OK)
        return Response({
            "ok":False,
            "msg":"No se econtro el producto"
        },status=status.HTTP_400_BAD_REQUEST)




