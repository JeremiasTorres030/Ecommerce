from django.urls import path
from api.views import ProductView

urlpatterns = [path("product/get/",ProductView.as_view())]
