import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { map } from 'rxjs';
import { onErrorResumeNext } from 'rxjs/operators';
import { BuyComponent } from './pages/buy/buy.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategoryComponent } from './pages/category/category.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { MyProductsComponent } from './pages/protected_pages/my-products/my-products.component';
import { ProfileComponent } from './pages/protected_pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserComponent } from './pages/user/user.component';
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
    path: 'buy',
    component: BuyComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'register', component: RegisterComponent },
  { path: 'user/:userId', component: UserComponent },
  {
    path: 'profile',
    children: [
      { path: 'view', component: ProfileComponent },
      { path: 'my-products', component: MyProductsComponent },
    ],
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
  {
    path: 'category/:categoryName',
    component: CategoryComponent,
  },
  {
    path: 'sub-category/:categoryName',
    component: CategoryComponent,
    data: {
      subCategory: true,
    },
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
