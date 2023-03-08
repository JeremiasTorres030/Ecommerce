import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EcommerService } from 'src/app/ecommer/service/ecommer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public token: string = '';
  public timer!: ReturnType<typeof setTimeout>;
  public activateUserMenu: boolean = false;
  public username: string = '';

  constructor(private router: Router, private ecommerService: EcommerService) {}

  ngOnInit(): void {
    this.ecommerService.loginEvent.subscribe((res) => {
      this.token = res.token;
      this.username = res.username;
    });

    const localToken = localStorage.getItem('token') ?? '';
    if (localToken === '') {
      return;
    }
    this.ecommerService.tokenVerification(localToken).subscribe({
      next: (res) => {
        if (res.username) {
          this.username = res.first_name;
          this.token = localToken;
        }
      },
      error: () => {
        this.token = '';
      },
    });
  }

  logOut(): void {
    this.ecommerService.logOutUser(this.token).subscribe();
    localStorage.removeItem('token');
    this.token = '';
    this.activateUserMenu = false;
    this.router.navigateByUrl('/');
  }
  profile(): void {
    this.activateUserMenu = false;
    this.router.navigateByUrl('/profile/view');
  }

  myProducts(): void {
    this.activateUserMenu = false;
    this.router.navigateByUrl('/profile/my-products');
  }

  userMenu(): void {
    this.activateUserMenu = !this.activateUserMenu;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.activateUserMenu = false;
    }, 10000);
  }
}
