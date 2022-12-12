import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/schemas/product.schema';
import { Shop, ShopDocument } from 'src/schemas/shop.schema';
import { CreateShopDto } from './dto/create-shop.dto';

@Injectable()
export class ShopsService {
  constructor(@InjectModel(Shop.name) private shopModel: Model<ShopDocument>) {}
  @Inject(ProductsService)
  productsService: ProductsService;

  async getShopById(shopId: string) {
    return this.shopModel.find({ _id: shopId }).exec();
  }

  async getAllShops() {
    return this.shopModel.find({}).exec();
  }

  async createShop(shop: CreateShopDto) {
    const newShop = new this.shopModel({
      name: shop.name,
      domain: shop.domain,
    });
    return newShop.save();
  }

  async updateShop(shopId: string, shop: CreateShopDto) {
    await this.shopModel.findByIdAndUpdate(shopId, {
      $set: shop,
    });
  }

  async insertProducts(shopId: string, productId: string[]) {
    await this.shopModel.findByIdAndUpdate(shopId, {
      $addToSet: { products: productId },
    });
  }

  async insertService(shopId: string, serviceId: string[]) {
    await this.shopModel.findByIdAndUpdate(shopId, {
      $addToSet: { services: serviceId },
    });
  }

  async removeShop(shopId: string) {
    return await this.shopModel.findByIdAndDelete(shopId);
  }
}
