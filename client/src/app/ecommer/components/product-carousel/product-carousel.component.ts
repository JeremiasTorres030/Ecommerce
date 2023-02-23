import { Component, Input, OnInit } from '@angular/core';
import { EcommerService } from '../../service/ecommer.service';
import { Categories, Product } from '../../types/types';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.css'],
})
export class ProductCarouselComponent implements OnInit {
  @Input() public categoryName: string = '';
  @Input() public productId: number = 0;
  public moreProducts: Array<Product> = [];

  constructor(private ecommerService: EcommerService) {}
  ngOnInit(): void {
    this.ecommerService
      .getProductsByCategory(this.categoryName as Categories)
      .subscribe({
        next: (res) => {
          this.moreProducts = res.filter(({ id }) => id !== this.productId);
        },
      });
  }
}
