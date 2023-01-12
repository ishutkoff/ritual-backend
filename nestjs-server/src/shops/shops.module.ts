import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from 'src/schemas/shop.schema';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { ProductsModule } from 'src/products/products.module';
import { ServicesModule } from 'src/services/services.module';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { CategoriesModule } from 'src/categories/categories.module';
import { Product, ProductSchema } from '../schemas/product.schema';
import { Service, ServiceSchema } from '../schemas/service.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shop.name, schema: ShopSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Product.name, schema: ProductSchema },
      { name: Service.name, schema: ServiceSchema },
    ]),
    ProductsModule,
    ServicesModule,
    CategoriesModule,
  ],
  providers: [ShopsService],
  controllers: [ShopsController],
  exports: [ShopsService],
})
export class ShopsModule {}
