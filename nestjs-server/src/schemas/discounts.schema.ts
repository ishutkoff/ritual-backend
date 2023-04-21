import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type DiscountDocument = HydratedDocument<Discount>;

@Schema()
export class Discount {
  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop()
  discount: number;
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);
