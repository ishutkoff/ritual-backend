import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  category: string;
  burial: boolean;
  cremation: boolean;
}

export class UpdateServiceDto {
  @IsString()
  @IsNotEmpty()
  _id: string;
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  category: string;
  burial: boolean;
  cremation: boolean;
}
