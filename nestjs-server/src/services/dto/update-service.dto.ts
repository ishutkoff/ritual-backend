import { ObjectId } from 'mongoose';

export class UpdateServiceDto {
  title: string;
  price: number;
  group: string;
  burial: boolean;
  cremation: boolean;
}
