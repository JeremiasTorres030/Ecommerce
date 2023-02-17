import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EcommerService } from 'src/app/ecommer/service/ecommer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public searchForm = this.fb.group({
    searchValue: ['', [Validators.required]],
  });

  public token: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ecommerService: EcommerService
  ) {}

  ngOnInit(): void {
    this.ecommerService.loginEvent.subscribe((res) => {
      this.token = res;
    });

    const localToken = localStorage.getItem('token') ?? '';
    if (localToken === '') {
      return;
    }
    this.ecommerService.tokenVerification(localToken).subscribe({
      next: (res) => {
        if (res.username) {
          this.token = localToken;
        }
      },
      error: () => {
        this.token = '';
      },
    });
  }

  submitForm(): void {}

  cart(): void {
    this.router.navigateByUrl('/cart');
  }

  login(): void {
    this.router.navigateByUrl('/user/login');
  }

  logOut(): void {
    this.ecommerService.logOutUser(this.token).subscribe();

    localStorage.removeItem('token');
    this.token = '';
  }
  profile(): void {
    this.router.navigateByUrl('/user/profile');
  }
}
