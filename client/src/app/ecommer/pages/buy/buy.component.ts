import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent implements OnInit {
  public lastKey: string = '';

  public buyForm = this.fb.group({
    number: [
      '',
      [
        Validators.required,
        Validators.maxLength(19),
        Validators.minLength(19),
        Validators.pattern(
          /[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]/
        ),
      ],
    ],
    secureNumber: [
      '',
      [
        Validators.required,
        Validators.maxLength(3),
        Validators.minLength(3),
        Validators.pattern(/[0-9][0-9][0-9]/),
      ],
    ],
    expirationYear: [
      '',
      [
        Validators.required,
        Validators.maxLength(2),
        Validators.minLength(2),
        Validators.pattern(/[0-9][0-9]/),
      ],
    ],
    expirationMonth: [
      '',
      [
        Validators.required,
        Validators.maxLength(2),
        Validators.minLength(2),
        Validators.pattern(/[0-9][0-9]/),
      ],
    ],
    name: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buyForm.get('number')?.valueChanges.subscribe((res) => {
      if (
        (res?.length === 4 && this.lastKey !== 'Backspace') ||
        (res?.length === 9 && this.lastKey !== 'Backspace') ||
        (res?.length === 14 && this.lastKey !== 'Backspace')
      ) {
        this.buyForm.get('number')?.setValue(`${res}-`);
        return;
      }
    });
  }

  submitForm(): void {
    console.log(this.buyForm.valid);
  }

  onkeyDown(e: KeyboardEvent): void {
    const key = e.key;
    this.lastKey = key;
  }
}
