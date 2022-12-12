import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type GroupDocument = HydratedDocument<Group>;

@Schema()
export class Group {
  @Prop()
  title: string;

  @Prop()
  forServices: boolean;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
