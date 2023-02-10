export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  seller: number;
}

export type Category =
  | 'Ropa'
  | 'Tecnologia'
  | 'Computacion'
  | 'Deportes'
  | 'Electrodomesticos'
  | 'Instrumentos';
