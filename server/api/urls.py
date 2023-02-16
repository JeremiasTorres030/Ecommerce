from django.urls import path
from api.views import ProductView, CategoryView, ProductAllView,UnicUserView , UserView,UserLoginView

urlpatterns = [
    path("product/getAll/",ProductAllView.as_view()),
    path("category/<str:categoryName>",CategoryView.as_view()),
    path("product/<str:productId>",ProductView.as_view()),
    path("user/<str:userId>",UnicUserView.as_view()),
    path("user/",UserView.as_view()),
    path("userlogin/",UserLoginView.as_view()),


    ]
