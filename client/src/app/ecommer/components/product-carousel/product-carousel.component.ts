import { Component, Input, OnChanges } from '@angular/core';
import { EcommerService } from '../../service/ecommer.service';
import { Categories, Product } from '../../types/types';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.css'],
})
export class ProductCarouselComponent implements OnChanges {
  @Input() public categoryName: string = '';
  @Input() public subCategoryName: string = '';
  @Input() public productId: number = 0;
  @Input() public subCategory: boolean = false;
  public moreProducts: Array<Product> = [];
  constructor(private ecommerService: EcommerService) {}

  ngOnChanges(): void {
    if (this.subCategory) {
      this.ecommerService
        .getProductsBySubCategory(this.categoryName)
        .subscribe({
          next: (res) => {
            this.moreProducts = res.results.products.filter(
              ({ id }) => id !== this.productId
            );
            this.moreProducts.length = 4;
          },
        });
      return;
    }

    this.ecommerService
      .getProductsByCategory(this.categoryName as Categories)
      .subscribe({
        next: (res) => {
          this.moreProducts = res.results.products.filter(
            ({ id, sub_category }) =>
              id !== this.productId && sub_category !== this.subCategoryName
          );
          this.moreProducts.length = 4;
        },
      });
  }
}
