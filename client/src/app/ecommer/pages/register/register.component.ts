import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EcommerService } from '../../service/ecommer.service';
import { userFormRegister } from '../../types/types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public registerForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private ecommerService: EcommerService,
    private router: Router
  ) {}

  submitForm(): void {
    if (this.registerForm.valid) {
      this.ecommerService
        .registerUser(this.registerForm.value as userFormRegister)
        .subscribe({
          next: (res) => {
            if (res.ok) {
              this.router.navigateByUrl('/user/login');
            }
          },
        });
    }
  }
}
