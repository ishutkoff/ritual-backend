import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types, Model } from 'mongoose';
import { Service, ServiceDocument } from 'src/schemas/service.schema';
import { Shop, ShopDocument } from 'src/schemas/shop.schema';
import { CreateServiceDto, UpdateServiceDto } from './dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name)
    private serviceModel: Model<ServiceDocument>,
    @InjectModel(Shop.name)
    private shopModel: Model<ShopDocument>,
  ) {}

  async createService(service: CreateServiceDto) {
    const newProduct = new this.serviceModel(service);
    return newProduct.save();
  }
  async getServiceById(serviceId: string) {
    return this.serviceModel.findOne({ _id: serviceId }).exec();
  }

  async updateService(service: UpdateServiceDto) {
    await this.serviceModel.findByIdAndUpdate(service._id, {
      $set: service,
    });
  }
  async removeService(serviceId: string) {
    const shops = await this.shopModel.find({ services: serviceId });

    if (shops.length > 0) {
      shops.forEach(async (shop) => {
        await this.shopModel.findByIdAndUpdate(shop._id.valueOf(), {
          $pull: {
            services: serviceId,
          },
        });
      });
    }

    return await this.serviceModel.findByIdAndDelete(serviceId);
  }
}
