import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { ProductsModule } from 'src/products/products.module';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { Product, ProductSchema } from 'src/schemas/product.schema';
import { Service, ServiceSchema } from 'src/schemas/service.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
    ProductsModule,
  ],
  providers: [CategoriesService],
  controllers: [CategoriesController],
  exports: [CategoriesService],
})
export class CategoriesModule {}
