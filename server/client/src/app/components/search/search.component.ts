import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { EcommerService } from 'src/app/ecommer/service/ecommer.service';
import { Product } from 'src/app/ecommer/types/types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public searchForm = this.fb.group({
    searchValue: ['', [Validators.required]],
  });
  public suggestions: Array<Product> = [];

  constructor(
    private fb: FormBuilder,
    private ecommerService: EcommerService
  ) {}

  ngOnInit(): void {
    this.searchForm
      .get('searchValue')
      ?.valueChanges.pipe(debounceTime(1000))
      .subscribe((value) => {
        if (value !== '' || value !== null) {
          this.ecommerService.getProductsByName(value!).subscribe({
            next: (res) => {
              if (res.ok) {
                this.suggestions = res.data;
              }
            },
            error: (err) => {
              this.suggestions = [];
            },
          });
          return;
        }
      });
  }
  selectProduct(): void {
    this.searchForm.get('searchValue')?.setValue('');
    this.suggestions = [];
  }
}
