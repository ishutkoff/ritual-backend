import { IsString, IsNotEmpty } from 'class-validator';

interface orderItem {
  _id: string;
  category: string;
  price: number;
  title: string;
}

export class dataConstructorObjectDto {
  @IsString()
  @IsNotEmpty()
  shopId: string;
  name: string;
  @IsString()
  @IsNotEmpty()
  phone: string;
  @IsString()
  @IsNotEmpty()
  document: string;
}
export class dataCalculatorObjectDto {
  @IsString()
  @IsNotEmpty()
  shopId: string;
  name: string;
  @IsString()
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  orderList: orderItem[];
}
