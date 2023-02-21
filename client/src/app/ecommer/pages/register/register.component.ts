import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { EcommerService } from '../../service/ecommer.service';
import { userFormRegister } from '../../types/types';
import { passwordValidator } from '../../validators/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public registerForm = this.fb.group(
    {
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [passwordValidator],
    }
  );

  constructor(
    private fb: FormBuilder,
    private ecommerService: EcommerService,
    private router: Router
  ) {}

  submitForm(): void {
    if (this.registerForm.valid) {
      this.ecommerService
        .registerUser(this.registerForm.value as userFormRegister)
        .pipe(
          tap((res) => {
            if (res.ok) {
              this.ecommerService
                .loginUser({
                  username: this.registerForm.get('username')?.value ?? '',
                  password: this.registerForm.get('password')?.value ?? '',
                })
                .subscribe();
            }
          })
        )
        .subscribe({
          next: (res) => {
            if (res.ok) {
              this.router.navigateByUrl('/');
            }
          },
        });
    }
  }
}
