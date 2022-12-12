import { Product } from 'src/schemas/product.schema';

export class CreateShopDto {
  name: string;
  domain: string;
  products: Product[];
}
