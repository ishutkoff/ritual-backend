import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from 'src/schemas/service.schema';
import { Shop, ShopSchema } from 'src/schemas/shop.schema';
import { ProductsController as ServicesController } from './services.controller';
import { ServicesService } from './services.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
  ],
  providers: [ServicesService],
  controllers: [ServicesController],
  exports: [ServicesService],
})
export class ServicesModule {}
