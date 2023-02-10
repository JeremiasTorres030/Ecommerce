import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { EcommerService } from '../../service/ecommer.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public name: string = '';

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
              this.name = res.name;
            },
          });
        })
      )
      .subscribe();
  }
}
