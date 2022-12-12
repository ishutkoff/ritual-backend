import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { Shop, ShopDocument } from 'src/schemas/shop.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
    @InjectModel(Shop.name)
    private shopModel: Model<ShopDocument>,
  ) {}

  async createProduct(product: CreateProductDto) {
    const newProduct = new this.productModel({
      title: product.title,
      image: product.image,
      price: product.price,
      burial: product.burial,
      cremation: product.cremation,
    });
    return newProduct.save();
  }
  async getProductById(productId: string) {
    return this.productModel.find({ _id: productId }).exec();
  }

  async getAllProducts() {
    return this.productModel.find({}).exec();
  }

  async updateProduct(productId: string, product: UpdateProductDto) {
    await this.productModel.findByIdAndUpdate(productId, {
      $set: product,
    });
  }

  async setGroup(productId: string, groupId: string) {
    await this.productModel.findByIdAndUpdate(productId, {
      $set: { group: groupId },
    });
  }

  async removeProduct(productId: string) {
    const shops = await this.shopModel.find({ products: productId });

    if (shops.length > 0) {
      shops.forEach(async (shop) => {
        await this.shopModel.findByIdAndUpdate(shop._id.valueOf(), {
          $pull: {
            products: productId,
          },
        });
      });
    }

    return await this.productModel.findByIdAndDelete(productId);
  }
}
