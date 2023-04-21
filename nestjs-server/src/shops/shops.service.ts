import { DiscountsService } from './../discounts/discounts.service';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { ProductsService } from 'src/products/products.service';
import { Category, CategoryDocument } from 'src/schemas/category.schema';
import { Shop, ShopDocument } from 'src/schemas/shop.schema';
import { ServicesService } from 'src/services/services.service';
import { CreateShopDto, UpdateShopDto } from './dto';
import { Product, ProductDocument } from '../schemas/product.schema';
import { Service, ServiceDocument } from '../schemas/service.schema';
import { Discount, DiscountDocument } from '../schemas/discounts.schema';
import {
  VMonument,
  VMonumentDocument,
} from '../schemas/visualizator-monument.schema';
import {
  VSketch,
  VSketchDocument,
} from '../schemas/visualizator-sketch.schema';
import { VisualizatorSketchesService } from '../visualizator/visualizator-sketches.service';
import { VisualizatorMonumentsService } from '../visualizator/visualizator-monuments.service';
import { VisualizatorCategoryService } from '../visualizator/visualizator-category.service';
import { RequestSource } from './types';
import { log } from 'console';

@Injectable()
export class ShopsService {
  constructor(
    @InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
    @InjectModel(Discount.name) private discountModel: Model<DiscountDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
    @InjectModel(VMonument.name)
    private monumentModel: Model<VMonumentDocument>,
    @InjectModel(VSketch.name)
    private sketchModel: Model<VSketchDocument>,
  ) {}

  @Inject(ProductsService)
  productsService: ProductsService;

  @Inject(DiscountsService)
  discountsService: DiscountsService;

  @Inject(ServicesService)
  servicesService: ServicesService;

  @Inject(CategoriesService)
  categoriesService: CategoriesService;

  @Inject(VisualizatorSketchesService)
  visualizatorSketchesService: VisualizatorSketchesService;

  @Inject(VisualizatorMonumentsService)
  visualizatorMonumentsService: VisualizatorMonumentsService;

  @Inject(VisualizatorCategoryService)
  visualizatorCategoryService: VisualizatorCategoryService;

  async getShopById(shopId: string, requestSource?: RequestSource) {
    const shop = await this.shopModel.findOne({ _id: shopId });

    const shopInfo: any = {};
    if (!requestSource) {
      shopInfo.name = shop.name;
      shopInfo.domain = shop.domain;
      shopInfo.phone = shop.phone;
      shopInfo.telegramApiKey = shop.telegramApiKey;
      shopInfo.chatId = shop.chatId;
      shopInfo.email = shop.email;
    }
    if (!requestSource || requestSource === RequestSource.CALCULATOR) {
      shopInfo.products = await Promise.all(
        shop.products.map(async (product) => {
          return this.productModel.findOne({ _id: product });
        }),
      );
      shopInfo.services = await Promise.all(
        shop.services.map(async (service) => {
          return this.serviceModel.findOne({ _id: service });
        }),
      );
    }
    if (!requestSource || requestSource === RequestSource.VISUALIZATOR) {
      shopInfo.sketches = await Promise.all(
        shop.sketches.map(async (sketch) => {
          return this.sketchModel.findOne({ _id: sketch });
        }),
      );
      shopInfo.monuments = await Promise.all(
        shop.monuments.map(async (monument) => {
          return this.monumentModel.findOne({ _id: monument });
        }),
      );
    }
    if (!requestSource || requestSource === RequestSource.DISCOUNT) {
      shopInfo.discounts = await Promise.all(
        shop.discounts.map(async (discount) => {
          return this.discountModel.findOne({ _id: discount });
        }),
      );
    }
    return shopInfo;
  }

  async getShopSettings(shopId) {
    const shop = await this.shopModel.findOne({ _id: shopId });
    return {
      mainColor: shop.mainColor,
      useCalc: shop.useCalc,
      useVisual: shop.useVisual,
      useDiscount: shop.useDiscount,
      useTeaser: shop.useTeaser,
      products: shop.products,
    };
  }

  async getAllShops() {
    return this.shopModel.find({}).exec();
  }

  async createShop(shop: CreateShopDto) {
    const newShop = new this.shopModel(shop);
    return newShop.save();
  }

  async updateShop(shop: UpdateShopDto) {
    return this.shopModel.findByIdAndUpdate(
      shop._id,
      {
        $set: shop,
      },
      { new: true },
    );
  }

  async insertProducts(shopId: string, productId: string[]) {
    return this.shopModel.findByIdAndUpdate(
      shopId,
      {
        $addToSet: { products: productId },
      },
      { new: true },
    );
  }

  async insertDiscount(shopId: string, discountId: string[]) {
    console.log(discountId);
    console.log(shopId);
    return this.shopModel.findByIdAndUpdate(
      shopId,
      {
        $addToSet: { discounts: discountId },
      },
      { new: true },
    );
  }

  async insertService(shopId: string, serviceId: string[]) {
    return this.shopModel.findByIdAndUpdate(
      shopId,
      {
        $addToSet: { services: serviceId },
      },
      { new: true },
    );
  }

  async insertMonuments(shopId: string, monumentsId: string[]) {
    return this.shopModel.findByIdAndUpdate(
      shopId,
      {
        $addToSet: { monuments: monumentsId },
      },
      { new: true },
    );
  }

  async insertSketches(shopId: string, sketchesId: string[]) {
    return this.shopModel.findByIdAndUpdate(
      shopId,
      {
        $addToSet: { sketches: sketchesId },
      },
      { new: true },
    );
  }

  async removeShop(shopId: string) {
    const shop = await this.shopModel.findById(shopId);
    for (const product of shop.products) {
      await this.productsService.removeProduct(product.toString());
    }
    for (const discount of shop.discounts) {
      await this.discountsService.removeDiscount(discount.toString());
    }
    for (const service of shop.services) {
      await this.servicesService.removeService(service.toString());
    }
    for (const monument of shop.monuments) {
      await this.visualizatorMonumentsService.removeMonument(
        monument.toString(),
      );
    }
    for (const sketch of shop.sketches) {
      await this.visualizatorSketchesService.removeSketch(sketch.toString());
    }
    const categoriesList = await this.categoryModel
      .find({ shopId: shopId })
      .exec();
    for (const category of categoriesList) {
      await this.categoriesService.removeCategory(category._id.toString());
    }
    return this.shopModel.findByIdAndDelete(shopId);
  }
}
