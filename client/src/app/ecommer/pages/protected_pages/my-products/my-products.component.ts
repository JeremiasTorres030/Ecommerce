import { Component, OnInit } from '@angular/core';
import { EcommerService } from 'src/app/ecommer/service/ecommer.service';
import { Product } from 'src/app/ecommer/types/types';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css'],
})
export class MyProductsComponent implements OnInit {
  public userProducts: Array<Product> = [];
  public createForm: boolean = false;
  public editForm: boolean = false;
  public product: Product = {
    category: '',
    id: 0,
    image: '',
    name: '',
    price: 0,
    seller: '',
    sub_category: '',
  };

  constructor(private ecommerService: EcommerService) {}

  ngOnInit(): void {
    this.ecommerService
      .getProductsByUser(this.ecommerService.userGet.id)
      .subscribe({
        next: (res) => {
          this.userProducts = res;
        },
      });
  }

  createFormButton(): void {
    this.createForm = !this.createForm;
    this.editForm = false;
  }

  eventProduct(data: { type: string; value: string | Product }): void {
    if (data.type === 'Edit') {
      this.editProduct(data.value as Product);
      return;
    }
    this.deleteProduct(data.value as string);
  }

  editProduct(product: Product): void {
    this.createForm = false;
    this.editForm = true;
    this.product = product;
  }

  deleteProduct(id: string): void {}
}
