import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { EcommerService } from '../../service/ecommer.service';
import { Product } from '../../types/types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public product: Product = {
    category: 'Ropa',
    id: 0,
    image: 'imagen.png',
    name: 'Pantalon gris largo',
    price: 150,
    seller: '',
  };

  public loading: boolean = true;
  public inCart: boolean = false;

  constructor(
    private ecommerService: EcommerService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap(({ productId }) => {
          this.ecommerService.getProduct(productId).subscribe({
            next: (res) => {
              this.product = res;
              this.inCartCheck();
              this.loading = false;
            },
          });
        })
      )
      .subscribe();
  }

  addToCart(): void {
    const cartListLocal: string | null = localStorage.getItem('cartList');
    let cartList: Array<Product> = [];
    if (cartListLocal) {
      cartList = JSON.parse(cartListLocal);
      const exist = cartList.find(({ id }) => {
        return id == this.product.id;
      });
      if (exist === undefined) {
        cartList.push(this.product);
        localStorage.setItem('cartList', JSON.stringify(cartList));
        this.inCart = true;
        return;
      }
      return;
    }
    cartList.push(this.product);
    localStorage.setItem('cartList', JSON.stringify(cartList));
    this.inCart = true;
  }

  removeFromCart(): void {
    const cartListLocal: string | null = localStorage.getItem('cartList');
    let cartList: Array<Product> = [];
    if (cartListLocal) {
      cartList = JSON.parse(cartListLocal);
      const index = cartList.findIndex(({ id }) => {
        return id == this.product.id;
      });
      cartList.splice(index, 1);
      localStorage.setItem('cartList', JSON.stringify(cartList));
      this.inCart = false;
    }
  }

  inCartCheck(): void {
    const cartListLocal: string | null = localStorage.getItem('cartList');
    let cartList: Array<Product> = [];
    if (cartListLocal) {
      cartList = JSON.parse(cartListLocal);
      const exist = cartList.find(({ id }) => {
        return id == this.product.id;
      });
      if (exist !== undefined) {
        this.inCart = true;
      }
    }
  }
}
