import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  searchForm = this.fb.group({
    searchValue: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  submitForm(e: Event): void {}

  cart(): void {
    this.router.navigateByUrl('/cart');
  }
}
