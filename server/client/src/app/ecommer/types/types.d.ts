export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  sub_category: string;
  seller: string;
}

export interface ProductResponse {
  data: Array<Product>;
  ok: boolean;
}

export interface ProductWithSellerId extends Product {
  sellerId: string;
}

export interface Category {
  categoryImg: string;
  categoryName: string;
}

export interface User {
  username: string;
  first_name: string;
  last_name: string;
  id: number;
  email: string;
  image: string;
}

export interface UserResponse {
  data: Array<User>;
  ok: boolean;
}

export interface genericResponse {
  ok: boolean;
  msg: string;
}

export interface loginResponse {
  user: User;
  token: string;
}

export interface userForm {
  username: string;
  password: string;
}

export interface userFormRegister extends userForm {
  email: string;
  first_name: string;
  last_name: string;
}

export type Categories =
  | 'Ropa'
  | 'Muebles'
  | 'Computacion'
  | 'Deportes'
  | 'Electrodomesticos'
  | 'Instrumentos';

export interface ProductsPaginated {
  next: null | string;
  previous: null | string;
  results: {
    products: Array<Product>;
    ok: boolean;
  };
}
