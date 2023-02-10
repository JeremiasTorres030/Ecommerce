from django.urls import path
from api.views import ProductView, CategoryView

urlpatterns = [path("product/",ProductView.as_view()),
path("category/<str:categoryName>",CategoryView.as_view())]
