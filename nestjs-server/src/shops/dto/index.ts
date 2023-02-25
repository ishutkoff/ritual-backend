import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Product } from 'src/schemas/product.schema';
import { VMonument } from '../../schemas/visualizator-monument.schema';
import { VSketch } from '../../schemas/visualizator-sketch.schema';

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
  @IsString()
  @IsNotEmpty()
  chatId: string;
  telegramBot: string;
  services: Product[];
  products: Product[];
  monuments: VMonument[];
  sketches: VSketch[];
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
  @IsString()
  @IsNotEmpty()
  telegramApiKey: string;
  @IsString()
  @IsNotEmpty()
  chatId: string;
  services: Product[];
  products: Product[];
  monuments: VMonument[];
  sketches: VSketch[];
}
