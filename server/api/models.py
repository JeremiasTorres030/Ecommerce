from django.db import models
from django.contrib.auth.models import User  

# Create your models here.
class ProductModel (models.Model):

    # ropa_type=(
    #     ("Zapatillas","Zapatillas"),
    #     ("Remeras","Remeras"),
    #     ("Pantalones","Pantalones"),
    #     ("Camperas","Camperas"),
    #     ("Gorras","Gorras")
    # )

    categories=(
        ("Ropa","Ropa"),
        ("Celulares","Celulares"),
        ("Computacion","Computacion"),
        ("Deportes","Deportes"),
        ("Electrodomesticos","Electrodomesticos"),
        ("Instrumentos","Instrumentos")
    )



    name = models.CharField(max_length=250)
    price = models.IntegerField()
    image = models.ImageField(upload_to="./images", default="")
    # type = models.CharField(max_length=40, choices=ropa_type , default="")
    category = models.CharField(max_length=40, choices=categories , default="")
    seller = models.ForeignKey(User, on_delete=models.CASCADE)
