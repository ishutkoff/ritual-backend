import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type VMonumentDocument = HydratedDocument<VMonument>;

@Schema()
export class VMonument {
  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop()
  shopId: string;
}

export const VMonumentSchema = SchemaFactory.createForClass(VMonument);
