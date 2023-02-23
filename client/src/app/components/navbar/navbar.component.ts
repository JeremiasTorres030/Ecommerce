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
  public timer!: ReturnType<typeof setTimeout>;
  public activateUseMenu: boolean = false;
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

  logOut(): void {
    this.ecommerService.logOutUser(this.token).subscribe();
    localStorage.removeItem('token');
    this.token = '';
    this.activateUseMenu = false;
    this.router.navigateByUrl('/');
  }
  profile(): void {
    this.activateUseMenu = false;
    this.router.navigateByUrl('/user/profile');
  }

  userMenu(): void {
    this.activateUseMenu = !this.activateUseMenu;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.activateUseMenu = false;
    }, 10000);
  }
}
