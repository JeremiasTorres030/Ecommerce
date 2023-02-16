import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  ],
  imports: [CommonModule, EcommerRoutingModule, ReactiveFormsModule],
})
export class EcommerModule {}
