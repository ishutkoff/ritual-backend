import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type VSketchDocument = HydratedDocument<VSketch>;

@Schema()
export class VSketch {
  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop()
  shopId: string;

  @Prop()
  categoryId: string;
}

export const VSketchSchema = SchemaFactory.createForClass(VSketch);
