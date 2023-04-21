import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  image: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  category: string;
  burial: boolean;
  cremation: boolean;
}

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  _id: string;
  @IsString()
  @IsNotEmpty()
  title: string;
  image: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  category: string;
  burial: boolean;
  cremation: boolean;
}
