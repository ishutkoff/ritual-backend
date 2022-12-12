import { ObjectId } from 'mongoose';

export class UpdateProductDto {
  title: string;
  image: string;
  price: number;
  group: string;
  burial: boolean;
  cremation: boolean;
}
