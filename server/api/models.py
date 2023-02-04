from django.db import models
from django.contrib.auth.models import User  

# Create your models here.
class ProductModel (models.Model):

    product_type=(
        ("Zapatillas","Zapatillas"),
        ("Remeras","Remeras"),
        ("Pantalones","Pantalones"),
        ("Camperas","Camperas"),
        ("Gorras","Gorras")
    )

    name = models.CharField(max_length=250)
    price = models.IntegerField()
    image = models.ImageField(upload_to="./images", default="")
    type = models.CharField(max_length=40, choices=product_type)
    seller = models.ForeignKey(User, on_delete=models.CASCADE)
