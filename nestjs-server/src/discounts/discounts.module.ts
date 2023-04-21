import { Discount, DiscountSchema } from './../schemas/discounts.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from 'src/files/files.module';
import { Shop, ShopSchema } from 'src/schemas/shop.schema';
import { DiscountsController } from './discounts.controller';
import { DiscountsService } from './discounts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Discount.name, schema: DiscountSchema },
    ]),
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
    FilesModule,
  ],
  providers: [DiscountsService],
  controllers: [DiscountsController],
  exports: [DiscountsService],
})
export class DiscountsModule {}
