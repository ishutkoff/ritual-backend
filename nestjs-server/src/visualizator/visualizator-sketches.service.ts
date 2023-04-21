import { Injectable } from '@nestjs/common';
import { CreateVisualizatorSketchDto } from './dto/visualizator-sketch.dto';
import { FilesService } from '../files/files.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop, ShopDocument } from '../schemas/shop.schema';
import {
  VSketch,
  VSketchDocument,
} from '../schemas/visualizator-sketch.schema';

@Injectable()
export class VisualizatorSketchesService {
  constructor(
    private readonly filesService: FilesService,
    @InjectModel(VSketch.name)
    private sketchModel: Model<VSketchDocument>,
    @InjectModel(Shop.name)
    private shopModel: Model<ShopDocument>,
  ) {}
  async createSketch(sketch: CreateVisualizatorSketchDto) {
    const newSketch = new this.sketchModel(sketch);
    return newSketch.save();
  }

  async getAllSketches() {
    return this.sketchModel.find({}).exec();
  }
  async getSketchById(sketchId: string) {
    return this.sketchModel.findOne({ _id: sketchId }).exec();
  }
  async removeSketch(sketchId: string) {
    const shops = await this.shopModel.find({ sketches: sketchId });

    if (shops.length > 0) {
      for (const shop of shops) {
        await this.shopModel.findByIdAndUpdate(shop._id.valueOf(), {
          $pull: {
            sketches: sketchId,
          },
        });
      }
    }
    const sketch = await this.sketchModel.findById(sketchId);
    await this.filesService.removeFile('./uploads/' + sketch.image);

    return this.sketchModel.findByIdAndDelete(sketchId);
  }
}
