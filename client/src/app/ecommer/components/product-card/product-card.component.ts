import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() image: string = '';
  @Input() price: number = 0;
  @Input() seller: number = 0;
}
