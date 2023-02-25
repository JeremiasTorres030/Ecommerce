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
    sub_category: '',
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
              this.addTo('lastVisited');
            },
          });
        })
      )
      .subscribe();
  }

  addTo(list: string = 'cartList'): void {
    const localList: string | null = localStorage.getItem(list);
    let localProducts: Array<Product> = [];
    if (localList) {
      localProducts = JSON.parse(localList);
      const exist = localProducts.find(({ id }) => {
        return id == this.product.id;
      });
      if (exist === undefined) {
        if (list === 'lastVisited' && localProducts.length === 5) {
          localProducts.shift();
          localProducts.push(this.product);
          localStorage.setItem(list, JSON.stringify(localProducts));
          return;
        }
        localProducts.push(this.product);
        localStorage.setItem(list, JSON.stringify(localProducts));
        this.inCart = true;
        return;
      }
      return;
    }
    localProducts.push(this.product);
    localStorage.setItem(list, JSON.stringify(localProducts));
    if (list === 'cartList') {
      this.inCart = true;
    }
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
        return;
      }
      this.inCart = false;
    }
  }
}
