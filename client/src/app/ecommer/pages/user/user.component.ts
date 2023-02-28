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
  public userData: User = {
    first_name: '',
    last_name: '',
    email: '',
    id: 0,
    username: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private ecommerService: EcommerService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap(({ userId }) => {
          this.ecommerService.getProductsByUser(userId).subscribe({
            next: (res) => {
              this.userProducts = res.data;
            },
          });
        }),
        tap(({ userId }) => {
          this.ecommerService.getUser(userId).subscribe({
            next: (res) => {
              this.userData = res;
            },
          });
        })
      )
      .subscribe();
  }
}
