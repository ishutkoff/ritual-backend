import { ObjectId } from 'mongoose';

export class CreateProductDto {
  title: string;
  image: string;
  price: number;
  group: string;
  burial: boolean;
  cremation: boolean;
}
