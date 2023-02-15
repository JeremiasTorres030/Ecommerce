export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  seller: number;
}

export interface Category {
  categoryImg: string;
  categoryName: string;
}

export type Categories =
  | 'Ropa'
  | 'Celulares'
  | 'Computacion'
  | 'Deportes'
  | 'Electrodomesticos'
  | 'Instrumentos';
