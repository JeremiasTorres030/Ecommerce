import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { EcommerService } from '../../service/ecommer.service';
import { Product, User } from '../../types/types';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  public userProducts: Array<Product> = [];
  public nextPage: string | null = '';
  public previousPage: string | null = '';
  public userData: User = {
    first_name: '',
    last_name: '',
    email: '',
    id: 0,
    username: '',
    image: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private ecommerService: EcommerService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap(({ userId }) => {
          this.ecommerService.getUser(userId).subscribe({
            next: (res) => {
              if (res.email) {
                this.userData = res;
              }
            },
          });
        }),
        tap(({ userId }) => {
          this.getProducts(userId);
        })
      )
      .subscribe();
  }

  getProducts(userId: number, page: string = '1'): void {
    this.ecommerService.getProductsByUser(userId, page).subscribe({
      next: (res) => {
        if (res.results.ok) {
          this.previousPage = res.previous;
          this.nextPage = res.next;
          this.userProducts = res.results.products;
        }
      },
    });
  }

  previousPageButton(): void {
    if (this.previousPage === null) return;
    this.getProducts(this.userData.id, this.previousPage);
    window.scrollTo(0, 0);
  }

  nextPageButton(): void {
    if (this.nextPage === null) return;
    this.getProducts(this.userData.id, this.nextPage);
    window.scrollTo(0, 0);
  }
}
