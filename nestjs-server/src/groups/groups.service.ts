import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Group, GroupDocument } from 'src/schemas/group.schema';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async createGroup(group: CreateGroupDto) {
    const newShop = new this.groupModel(group);
    return newShop.save();
  }

  async updateGroup(groupId: string, group: CreateGroupDto) {
    await this.groupModel.findByIdAndUpdate(groupId, {
      $set: group,
    });
  }

  async removeGroup(groupId: string) {
    const products = await this.productModel.find({ group: groupId });

    if (products.length > 0) {
      products.forEach(async (product) => {
        await this.productModel.findByIdAndUpdate(product._id.valueOf(), {
          $unset: {
            group: '',
          },
        });
      });
    }

    return await this.groupModel.findByIdAndDelete(groupId);
  }

  async getProductsGroups() {
    return this.groupModel.find({ forServices: false }).exec();
  }

  async getServicesGroups() {
    return this.groupModel.find({ forServices: true }).exec();
  }
}
