import { Component, OnInit } from '@angular/core';
import { EcommerService } from 'src/app/ecommer/service/ecommer.service';
import { Product } from 'src/app/ecommer/types/types';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css'],
})
export class MyProductsComponent implements OnInit {
  public nextPage: string | null = '';
  public previousPage: string | null = '';
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

  constructor(
    private ecommerService: EcommerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(page: string = '1'): void {
    this.ecommerService
      .getProductsByUser(this.ecommerService.userGet.id, page)
      .subscribe({
        next: (res) => {
          if (res.results.ok) {
            this.nextPage = res.next;
            this.previousPage = res.previous;
            this.userProducts = res.results.products;
          }
        },
      });
  }
  previousPageButton(): void {
    if (this.previousPage === null) return;
    this.getProducts(this.previousPage);
    window.scrollTo(0, 0);
  }

  nextPageButton(): void {
    if (this.nextPage === null) return;
    this.getProducts(this.nextPage);
    window.scrollTo(0, 0);
  }

  openFormButton(): void {
    this.createForm = true;
    this.editForm = false;
  }

  closeFormButton(): void {
    this.createForm = false;
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
    this.product = product;
    this.createForm = false;
    this.editForm = true;
  }

  deleteProduct(id: string): void {
    this.ecommerService.deleteProduct(id).subscribe({
      next: (res) => {
        if (res.ok) {
          this.getProducts();
          this.snackBar.open('Producto eliminado con exito ✅', undefined, {
            duration: 2000,
          });
        }
      },
      error: () => {
        this.snackBar.open('Ha ocurrido un error ⚠', undefined, {
          duration: 2000,
        });
      },
    });
  }

  productSucces(): void {
    this.getProducts();
    this.closeFormButton();
  }
}
