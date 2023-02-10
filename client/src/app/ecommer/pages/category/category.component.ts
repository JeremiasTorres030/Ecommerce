import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { EcommerService } from '../../service/ecommer.service';
import { Product } from '../../types/types';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  public title: string = '';
  public productsList: Array<Product> = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private EcommerService: EcommerService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(
        tap(({ categoryName }) => {
          this.EcommerService.getProductsByCategory(categoryName).subscribe({
            next: (res) => {
              this.productsList = res;
            },
          });
        })
      )
      .subscribe(({ categoryName }) => {
        this.title = categoryName;
      });
  }
}
