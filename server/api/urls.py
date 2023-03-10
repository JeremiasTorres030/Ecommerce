from django.urls import path
from api.views import UnicProductView, CategoryView, ProductName,UnicUserView , UserView,UserLoginView, UserTokenView, ProductView, SubCategoryView,UserProductsView
from knox.views import LogoutView

urlpatterns = [
    path("product/",ProductView.as_view()),
    path("product/name/<str:productName>",ProductName.as_view()),
    path("category/<str:categoryName>",CategoryView.as_view()),
    path("sub-category/<str:subCategoryName>",SubCategoryView.as_view()),
    path("product/<str:productId>",UnicProductView.as_view()),
    path("user/<str:userId>",UnicUserView.as_view()),
    path("user/",UserView.as_view()),
    path("user/products/<str:userId>",UserProductsView.as_view()),
    path("user/login/",UserLoginView.as_view()),
    path("user/token/",UserTokenView.as_view()),
    path("user/logout",LogoutView.as_view()),



    ]
