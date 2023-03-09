
# Ecommerce

Ecommerce es un proyecto de práctica inspirado en la tienda online Amazon.

[**Demo**](https://ecommerce-production-e985.up.railway.app/)


## Imagenes


- Inicio


![Pagina de inicio](https://res.cloudinary.com/drifqbdtu/image/upload/w_750/v1678395209/Readme/Econmerce/Inicio_cd96tf.png)
- Carrito


![Carrito](https://res.cloudinary.com/drifqbdtu/image/upload/w_750/v1678395209/Readme/Econmerce/carrito_rhhako.png)
- Pagina de categoria


![Pagina de categoria](https://res.cloudinary.com/drifqbdtu/image/upload/w_750/v1678395209/Readme/Econmerce/Categoria_vh0ue2.jpg)
- Pagina de sub categoria


![Pagina de sub categoria](https://res.cloudinary.com/drifqbdtu/image/upload/w_750/v1678395210/Readme/Econmerce/SubCategoria_tjfz17.png)
- Pagina de producto


![Pagina de producot](https://res.cloudinary.com/drifqbdtu/image/upload/w_750/v1678395210/Readme/Econmerce/producto_q4lhbg.png)
- Pagina de usuario


![Pagina de usuario](https://res.cloudinary.com/drifqbdtu/image/upload/w_750/v1678395210/Readme/Econmerce/usuario_shmefq.png)
- Crear productos


![Formulario de creacion](https://res.cloudinary.com/drifqbdtu/image/upload/w_750/v1678395209/Readme/Econmerce/formularioProdcutos_shucaw.png)
- Pagina de compra


![Pagina de compra](https://res.cloudinary.com/drifqbdtu/image/upload/w_750/v1678395209/Readme/Econmerce/comprar_oqxm5t.png)
## Variables de entorno

Para inicializar el proyecto se necesita un archivo .env en el directorio "/" con los siguientes valores.

`SECRET_KEY` Django

`CLOUDINARY_URL` Cloudinary Api
## Instalacion e inicio para desarrollo

Instalación e inicio para desarrollo.

- Servidor.

```bash
   cd server
   py -m vevn virtual
   virtual\Scripts\activate
   pip install -r requirements.txt
   py manage.py migrate  
   py manage.py runserver
```
- Cliente.

```bash
  cd server
  cd client
  npm install
  ng serve
```
## Estado del proyecto

El proyecto está finalizado.

