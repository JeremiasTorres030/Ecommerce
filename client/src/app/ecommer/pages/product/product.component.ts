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
    seller: 1,
  };

  public cargando: boolean = true;

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
              this.cargando = false;
            },
          });
        })
      )
      .subscribe();
  }
}
