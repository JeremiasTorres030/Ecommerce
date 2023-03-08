import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EcommerService } from '../../service/ecommer.service';
import { userForm } from '../../types/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public customError: string = '';

  constructor(
    private fb: FormBuilder,
    private ecommerService: EcommerService,
    private router: Router
  ) {}

  submitForm(): void {
    if (this.loginForm.valid) {
      this.ecommerService
        .loginUser(this.loginForm.value as userForm)
        .subscribe({
          next: (res) => {
            if (res.token) {
              this.router.navigateByUrl('/');
            }
          },
          error: () => {
            this.customError =
              'El nombre de usuario o la contraseña son incorrectos';
          },
        });
    }
  }
}
