import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
import { Product } from 'src/schemas/product.schema';
import { VMonument } from '../../schemas/visualizator-monument.schema';
import { VSketch } from '../../schemas/visualizator-sketch.schema';
import { Discount } from 'src/schemas/discounts.schema';

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

  //telegramBot: string;

  @IsString()
  @IsNotEmpty()
  mainColor: string;

  @IsBoolean()
  useCalc: boolean;

  @IsBoolean()
  useVisual: boolean;

  @IsBoolean()
  useDiscount: boolean;

  @IsBoolean()
  useTeaser: boolean;

  services: Product[];
  products: Product[];
  discounts: Discount[];
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
  discounts: Discount[];
  monuments: VMonument[];
  sketches: VSketch[];
}
