import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { EcommerRoutingModule } from './ecommer-routing.module';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { CategoryComponent } from './pages/category/category.component';

@NgModule({
  declarations: [HomeComponent, CategoryCardComponent, CategoryComponent],
  imports: [CommonModule, EcommerRoutingModule],
})
export class EcommerModule {}
