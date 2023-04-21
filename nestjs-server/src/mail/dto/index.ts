import { IsString, IsNotEmpty } from 'class-validator';

interface orderItem {
  _id: string;
  category: string;
  price: number;
  title: string;
}

export class dataObjectDto {
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
