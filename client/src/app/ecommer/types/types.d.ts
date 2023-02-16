export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  seller: string;
}

export interface Category {
  categoryImg: string;
  categoryName: string;
}

export interface User {
  username: string;
}

export interface UserData extends User {
  id: number;
  token: string;
}

export interface genericResponse {
  ok: boolean;
  msg: string;
}

export interface loginResponse {
  user: {
    username: string;
    id: number;
  };
  token: string;
}

export interface userForm {
  username: string;
  password: string;
}

export interface userFormRegister extends userForm {
  email: string;
}

export type Categories =
  | 'Ropa'
  | 'Celulares'
  | 'Computacion'
  | 'Deportes'
  | 'Electrodomesticos'
  | 'Instrumentos';
