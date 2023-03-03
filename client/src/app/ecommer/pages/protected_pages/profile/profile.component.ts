import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EcommerService } from 'src/app/ecommer/service/ecommer.service';
import { User } from 'src/app/ecommer/types/types';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    image: [null],
    email: [
      this.ecommerService.userGet.email,
      [Validators.required, Validators.email],
    ],
    password: [null],
  });
  public userImage: string = this.ecommerService.userGet.image;
  public customError: string = '';

  constructor(
    private fb: FormBuilder,
    private ecommerService: EcommerService,
    private snackBar: MatSnackBar
  ) {}
  onChangeFile(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const files = element.files;
    if (files) {
      this.editForm.patchValue({
        image: files[0] as unknown as null,
      });
      this.editForm.get('image')?.updateValueAndValidity();
    }
  }

  submitForm(): void {
    if (this.editForm.valid) {
      const formData = new FormData();
      formData.append('first_name', this.editForm.get('first_name')?.value!);
      formData.append('last_name', this.editForm.get('last_name')?.value!);
      formData.append('username', this.editForm.get('username')?.value!);
      formData.append('image', this.editForm.get('image')?.value!);
      formData.append('password', this.editForm.get('password')?.value!);
      formData.append('email', this.editForm.get('email')?.value!);
      this.ecommerService.editUser(formData as unknown as User).subscribe({
        next: (res) => {
          if (res.ok) {
            this.snackBar.open('Perfil editado con exito ✅', undefined, {
              duration: 2000,
            });
          }
        },
        error: () => {
          this.snackBar.open('Ha ocurrido un error ⚠', undefined, {
            duration: 2000,
          });
        },
      });

      return;
    }

    // submitForm(): void {
    //   if (this.editForm.valid) {
    //     const values: User = this.editForm.value as unknown as User;
    //     this.ecommerService.editUser(values).subscribe({
    //       next: (res) => {
    //         this.customError = res.msg;
    //       },
    //     });
    //   }
    // }
  }
}
