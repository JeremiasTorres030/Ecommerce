from django.urls import path
from api.views import ProductView, CategoryView, ProductAllView

urlpatterns = [
    path("product/getAll/",ProductAllView.as_view()),
    path("category/<str:categoryName>",CategoryView.as_view()),
    path("product/<str:productId>",ProductView.as_view()),
    ]
