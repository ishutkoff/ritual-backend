import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilesService } from 'src/files/files.service';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { Shop, ShopDocument } from 'src/schemas/shop.schema';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly filesService: FilesService,
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
    @InjectModel(Shop.name)
    private shopModel: Model<ShopDocument>,
  ) {}

  async createProduct(product: CreateProductDto) {
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }
  async getProductById(productId: string) {
    return this.productModel.findOne({ _id: productId }).exec();
  }
  async updateProduct(product: UpdateProductDto) {
    const res = await this.productModel.findOneAndUpdate(
      { _id: product._id },
      {
        $set: { ...product },
      },
      { new: true },
    );
    return res;
  }

  async removeProduct(productId: string) {
    const shops = await this.shopModel.find({ products: productId });

    if (shops.length > 0) {
      for (const shop of shops) {
        await this.shopModel.findByIdAndUpdate(shop._id.valueOf(), {
          $pull: {
            products: productId,
          },
        });
      }
    }
    const product = await this.productModel.findById(productId);
    this.filesService.removeFile('./uploads/' + product.image);

    return await this.productModel.findByIdAndDelete(productId);
  }
}
