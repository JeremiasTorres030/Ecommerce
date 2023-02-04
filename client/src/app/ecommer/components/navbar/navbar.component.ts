import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  searchForm = this.fb.group({
    searchValue: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}
}
