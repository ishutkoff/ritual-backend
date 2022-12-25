import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category, CategoryDocument } from 'src/schemas/category.schema';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { Service, ServiceDocument } from 'src/schemas/service.schema';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
    @InjectModel(Service.name)
    private serviceModel: Model<ServiceDocument>,
  ) {}

  async getAllCategories() {
    return await this.categoryModel.find();
  }

  async createCategory(category: CreateCategoryDto) {
    const newShop = new this.categoryModel(category);
    return newShop.save();
  }

  async updateCategory(category: UpdateCategoryDto) {
    return await this.categoryModel.findByIdAndUpdate(
      category._id,
      {
        $set: category,
      },
      { new: true },
    );
  }

  async removeCategory(categoryId: string) {
    const products = await this.productModel.find({ category: categoryId });
    const services = await this.serviceModel.find({ category: categoryId });

    if (products.length > 0) {
      for (const product of products) {
        await this.productModel.findByIdAndUpdate(
          product._id.valueOf(),
          {
            $unset: {
              category: '',
            },
          },
          { new: true },
        );
      }
    }
    if (services.length > 0) {
      for (const service of services) {
        await this.productModel.findByIdAndUpdate(
          service._id.valueOf(),
          {
            $unset: {
              category: '',
            },
          },
          { new: true },
        );
      }
    }
    return await this.categoryModel.findByIdAndDelete(categoryId);
  }
}
