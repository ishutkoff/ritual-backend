import { ObjectId } from 'mongoose';

export class CreateServiceDto {
  title: string;
  price: number;
  group: string;
  burial: boolean;
  cremation: boolean;
}
