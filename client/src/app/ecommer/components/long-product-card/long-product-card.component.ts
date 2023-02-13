import { Component, Input } from '@angular/core';
import { Product } from '../../types/types';

@Component({
  selector: 'app-long-product-card',
  templateUrl: './long-product-card.component.html',
  styleUrls: ['./long-product-card.component.css'],
})
export class LongProductCardComponent {
  @Input() product: Product = {
    category: '',
    id: 0,
    image: '',
    name: '',
    price: 0,
    seller: 0,
  };
}
