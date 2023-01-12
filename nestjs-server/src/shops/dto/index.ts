import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Product } from 'src/schemas/product.schema';

export class CreateShopDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  domain: string;
  @IsString()
  @IsNotEmpty()
  phone: string;
  @IsString()
  email: string;
  @IsString()
  @IsNotEmpty()
  telegramApiKey: string;
  telegramBot: string;
  services: Product[];
  products: Product[];
}

export class UpdateShopDto {
  @IsString()
  @IsNotEmpty()
  _id: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  domain: string;
  @IsString()
  @IsNotEmpty()
  phone: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  telegramBot: string;
  services: Product[];
  products: Product[];
}
