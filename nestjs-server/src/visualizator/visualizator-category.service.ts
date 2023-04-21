import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  VCategory,
  VCategoryDocument,
} from '../schemas/visualizator-category.schema';
import {
  VSketch,
  VSketchDocument,
} from '../schemas/visualizator-sketch.schema';
import {
  CreateVisualizatorCategoryDto,
  UpdateVisualizatorCategoryDto,
} from './dto/visualizator-category.dto';
import { VisualizatorSketchesService } from './visualizator-sketches.service';

@Injectable()
export class VisualizatorCategoryService {
  constructor(
    private readonly visualizatorSketchesService: VisualizatorSketchesService,
    @InjectModel(VCategory.name)
    private categoryModel: Model<VCategoryDocument>,
    @InjectModel(VSketch.name)
    private sketchModel: Model<VSketchDocument>,
  ) {}
  async getAllCategories(shop_id: string) {
    return await this.categoryModel
      .find({
        shopId: shop_id,
      })
      .exec();
  }

  async createCategory(category: CreateVisualizatorCategoryDto) {
    const newShop = new this.categoryModel(category);
    return newShop.save();
  }

  async updateCategory(category: UpdateVisualizatorCategoryDto) {
    return await this.categoryModel
      .findByIdAndUpdate(
        category._id,
        {
          $set: category,
        },
        { new: true },
      )
      .exec();
  }

  async removeCategory(categoryId: string) {
    const sketches = await this.sketchModel.find({ categoryId: categoryId });
    if (sketches.length > 0) {
      for (const sketch of sketches) {
        await this.visualizatorSketchesService.removeSketch(
          sketch._id.toString(),
        );
      }
    }
    return this.categoryModel.findByIdAndDelete(categoryId);
  }
}
