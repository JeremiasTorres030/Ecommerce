from django.urls import path
from api.views import ProductView, CategoryView, ProductAllView,UnicUserView , UserView,UserLoginView, UserTokenView
from knox.views import LogoutView

urlpatterns = [
    path("product/get/all",ProductAllView.as_view()),
    path("category/<str:categoryName>",CategoryView.as_view()),
    path("product/<str:productId>",ProductView.as_view()),
    path("user/<str:userId>",UnicUserView.as_view()),
    path("user/",UserView.as_view()),
    path("user/login/",UserLoginView.as_view()),
    path("user/token/",UserTokenView.as_view()),
    path("user/logout/",LogoutView.as_view()),


    ]
