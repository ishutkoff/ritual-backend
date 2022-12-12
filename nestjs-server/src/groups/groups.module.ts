import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { ProductsModule } from 'src/products/products.module';
import { Group, GroupSchema } from 'src/schemas/group.schema';
import { Product, ProductSchema } from 'src/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    ProductsModule,
  ],
  providers: [GroupsService],
  controllers: [GroupsController],
})
export class GroupsModule {}
