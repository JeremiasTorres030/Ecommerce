import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EcommerService } from 'src/app/ecommer/service/ecommer.service';
import { User } from 'src/app/ecommer/types/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  public editForm = this.fb.group({
    first_name: [this.ecommerService.userGet.first_name, [Validators.required]],
    last_name: [this.ecommerService.userGet.last_name, [Validators.required]],
    username: [this.ecommerService.userGet.username, [Validators.required]],
    email: [
      this.ecommerService.userGet.email,
      [Validators.required, Validators.email],
    ],
    password: [''],
  });

  public customError: string = '';

  constructor(
    private fb: FormBuilder,
    private ecommerService: EcommerService
  ) {}
  submitForm(): void {
    if (this.editForm.valid) {
      const values: User = this.editForm.value as User;
      this.ecommerService.editUser(values).subscribe({
        next: (res) => {
          this.customError = res.msg;
        },
      });
    }
  }
}
