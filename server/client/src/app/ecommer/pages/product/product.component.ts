import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { EcommerService } from '../../service/ecommer.service';
import { Product, ProductWithSellerId } from '../../types/types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public product: ProductWithSellerId = {
    category: 'Ropa',
    sub_category: '',
    id: 0,
    image: 'imagen.png',
    name: 'Pantalon gris largo',
    price: 150,
    seller: '',
    sellerId: '',
  };

  public loading: boolean = true;
  public inCart: boolean = false;
  constructor(
    private ecommerService: EcommerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap(({ productId }) => {
          this.ecommerService.getProduct(productId).subscribe({
            next: (res) => {
              this.product = res as ProductWithSellerId;
              this.inCartCheck();
              this.loading = false;
              this.addTo('lastVisited');
            },
            error: (res) => {
              if (res.ok === false) {
                this.router.navigateByUrl('');
              }
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
          let customImage: Product = this.product;
          customImage.image = `${this.product.image.slice(
            0,
            50
          )}h_300,w_300${this.product.image.slice(49)}`;
          localProducts.shift();
          localProducts.push(customImage);
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
    let customImage: Product = this.product;
    customImage.image = `${this.product.image.slice(
      0,
      50
    )}h_300,w_300${this.product.image.slice(49)}`;
    localProducts.push(customImage);
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

  buyNow(): void {
    if (this.inCart) {
      this.router.navigateByUrl('/buy');
      return;
    }
    this.addTo('cartList');
    this.router.navigateByUrl('/buy');
  }
}
