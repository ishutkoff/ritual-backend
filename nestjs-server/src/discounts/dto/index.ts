import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDiscountDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  image: string;
  @IsNumber()
  @IsNotEmpty()
  discount: number;
}

export class UpdateDiscountDto {
  @IsString()
  @IsNotEmpty()
  _id: string;
  @IsString()
  @IsNotEmpty()
  title: string;
  image: string;
  @IsNumber()
  @IsNotEmpty()
  discount: number;
}
