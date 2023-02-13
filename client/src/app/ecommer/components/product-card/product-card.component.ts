import { Component, Input } from '@angular/core';
import { Product } from '../../types/types';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product: Product = {
    name: '',
    category: '',
    id: 0,
    image: '',
    price: 0,
    seller: 0,
  };
}