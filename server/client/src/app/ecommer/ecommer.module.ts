import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { EcommerRoutingModule } from './ecommer-routing.module';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';
import { LongProductCardComponent } from './components/long-product-card/long-product-card.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/protected_pages/profile/profile.component';
import { ProductCarouselComponent } from './components/product-carousel/product-carousel.component';
import { MyProductsComponent } from './pages/protected_pages/my-products/my-products.component';
import { UserComponent } from './pages/user/user.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { BuyComponent } from './pages/buy/buy.component';

@NgModule({
  declarations: [
    HomeComponent,
    CategoryCardComponent,
    CategoryComponent,
    ProductCardComponent,
    ProductComponent,
    CartComponent,
    LongProductCardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    ProductCarouselComponent,
    MyProductsComponent,
    UserComponent,
    CreateProductComponent,
    BuyComponent,
  ],
  imports: [
    CommonModule,
    EcommerRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
})
export class EcommerModule {}
