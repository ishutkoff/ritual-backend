import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type ServiceDocument = HydratedDocument<Service>;

@Schema()
export class Service {
  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  group: string;

  @Prop()
  burial: boolean;

  @Prop()
  cremation: boolean;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
