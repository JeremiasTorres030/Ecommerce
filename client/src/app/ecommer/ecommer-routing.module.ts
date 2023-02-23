import { inject, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { map } from 'rxjs';
import { onErrorResumeNext } from 'rxjs/operators';
import { CartComponent } from './pages/cart/cart.component';
import { CategoryComponent } from './pages/category/category.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { EcommerService } from './service/ecommer.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'user',
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canMatch: [
          () => {
            const token = localStorage.getItem('token') ?? '';
            return inject(EcommerService)
              .tokenVerification(token)
              .pipe(
                map((res) => {
                  if (res.username) {
                    return true;
                  }
                  return false;
                }),
                onErrorResumeNext()
              );
          },
        ],
      },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: 'login' },
    ],
  },
  {
    path: 'category/:categoryName',
    component: CategoryComponent,
  },
  {
    path: 'product/:productId',
    component: ProductComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcommerRoutingModule {}
