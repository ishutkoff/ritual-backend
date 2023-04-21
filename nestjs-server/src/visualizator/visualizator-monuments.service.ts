import { Injectable } from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop, ShopDocument } from '../schemas/shop.schema';
import {
  VMonument,
  VMonumentDocument,
} from '../schemas/visualizator-monument.schema';
import { CreateVisualizatorMonumenthDto } from './dto/visualizator-monument.dto';

@Injectable()
export class VisualizatorMonumentsService {
  constructor(
    private readonly filesService: FilesService,
    @InjectModel(VMonument.name)
    private monumentModel: Model<VMonumentDocument>,
    @InjectModel(Shop.name)
    private shopModel: Model<ShopDocument>,
  ) {}
  async createMonument(monument: CreateVisualizatorMonumenthDto) {
    const newSketch = new this.monumentModel(monument);
    return newSketch.save();
  }

  async getMonumentById(monumentId: string) {
    return this.monumentModel.findOne({ _id: monumentId }).exec();
  }
  async removeMonument(monumentId: string) {
    const shops = await this.shopModel.find({ monuments: monumentId });

    if (shops.length > 0) {
      for (const shop of shops) {
        await this.shopModel.findByIdAndUpdate(shop._id.valueOf(), {
          $pull: {
            monuments: monumentId,
          },
        });
      }
    }
    const monument = await this.monumentModel.findById(monumentId);
    await this.filesService.removeFile('./uploads/' + monument.image);

    return this.monumentModel.findByIdAndDelete(monumentId);
  }
}
