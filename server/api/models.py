from django.db import models
from django.contrib.auth.models import User  

# Create your models here.
class ProductModel (models.Model):
    categories=(
        ("Ropa","Ropa"),
        ("Muebles","Muebles"),
        ("Computacion","Computacion"),
        ("Deportes","Deportes"),
        ("Electrodomesticos","Electrodomesticos"),
        ("Instrumentos","Instrumentos")
    )
    name = models.CharField(max_length=250)
    price = models.IntegerField()
    image = models.ImageField(upload_to="./images", default="")
    category = models.CharField(max_length=40, choices=categories , default="")
    sub_category = models.CharField(max_length=40,default="",)
    seller = models.ForeignKey(User, on_delete=models.CASCADE)
