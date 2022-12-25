import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { ProductsService } from 'src/products/products.service';
import { Category, CategoryDocument } from 'src/schemas/category.schema';
import { Shop, ShopDocument } from 'src/schemas/shop.schema';
import { ServicesService } from 'src/services/services.service';
import { CreateShopDto, UpdateShopDto } from './dto';

@Injectable()
export class ShopsService {
  constructor(
    @InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}
  @Inject(ProductsService)
  productsService: ProductsService;
  @Inject(ServicesService)
  servicesService: ServicesService;
  @Inject(CategoriesService)
  categoriesService: CategoriesService;

  async getShopById(shopId: string) {
    return this.shopModel.find({ _id: shopId }).exec();
  }

  async getAllShops() {
    return this.shopModel.find({}).exec();
  }

  async createShop(shop: CreateShopDto) {
    const newShop = new this.shopModel(shop);
    return newShop.save();
  }

  async updateShop(shop: UpdateShopDto) {
    return await this.shopModel.findByIdAndUpdate(
      shop._id,
      {
        $set: shop,
      },
      { new: true },
    );
  }

  async insertProducts(shopId: string, productId: string[]) {
    return await this.shopModel.findByIdAndUpdate(
      shopId,
      {
        $addToSet: { products: productId },
      },
      { new: true },
    );
  }

  async insertService(shopId: string, serviceId: string[]) {
    await this.shopModel.findByIdAndUpdate(
      shopId,
      {
        $addToSet: { services: serviceId },
      },
      { new: true },
    );
  }

  async removeShop(shopId: string) {
    const shop = await this.shopModel.findById(shopId);
    for (const product of shop.products) {
      await this.productsService.removeProduct(product.toString());
    }
    for (const service of shop.services) {
      await this.servicesService.removeService(service.toString());
    }
    const categoriesList = await this.categoryModel
      .find({ shopId: shopId })
      .exec();
    for (const category of categoriesList) {
      await this.categoriesService.removeCategory(category._id.toString());
    }
    return await this.shopModel.findByIdAndDelete(shopId);
  }
}
