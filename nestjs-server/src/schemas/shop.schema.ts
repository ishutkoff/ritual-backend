import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from './product.schema';
import { Service } from './service.schema';
import { VMonument } from './visualizator-monument.schema';
import { VSketch } from './visualizator-sketch.schema';

export type ShopDocument = mongoose.HydratedDocument<Shop>;

@Schema()
export class Shop {
  @Prop({ required: true })
  name: string;

  @Prop()
  domain: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  telegramApiKey: string;

  @Prop()
  chatId: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  products: Product[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }] })
  services: Service[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Monument' }] })
  monuments: VMonument[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sketch' }] })
  sketches: VSketch[];
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
