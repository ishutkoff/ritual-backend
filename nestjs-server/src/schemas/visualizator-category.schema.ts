import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type VCategoryDocument = HydratedDocument<VCategory>;

@Schema()
export class VCategory {
  @Prop()
  title: string;

  @Prop()
  shopId: string;
}

export const VCategorySchema = SchemaFactory.createForClass(VCategory);
