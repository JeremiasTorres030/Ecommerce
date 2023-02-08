import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { EcommerRoutingModule } from './ecommer-routing.module';
import { CategoryCardComponent } from './components/category-card/category-card.component';

@NgModule({
  declarations: [HomeComponent, CategoryCardComponent],
  imports: [CommonModule, EcommerRoutingModule],
})
export class EcommerModule {}
