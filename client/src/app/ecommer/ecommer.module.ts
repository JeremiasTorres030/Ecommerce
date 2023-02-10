import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { EcommerRoutingModule } from './ecommer-routing.module';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductComponent } from './pages/product/product.component';

@NgModule({
  declarations: [HomeComponent, CategoryCardComponent, CategoryComponent, ProductCardComponent, ProductComponent],
  imports: [CommonModule, EcommerRoutingModule],
})
export class EcommerModule {}
