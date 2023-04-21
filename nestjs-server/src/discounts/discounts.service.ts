import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilesService } from 'src/files/files.service';
import { Discount, DiscountDocument } from 'src/schemas/discounts.schema';
import { Shop, ShopDocument } from 'src/schemas/shop.schema';
import { CreateDiscountDto, UpdateDiscountDto } from './dto';

@Injectable()
export class DiscountsService {
  constructor(
    private readonly filesService: FilesService,
    @InjectModel(Discount.name)
    private discountModel: Model<DiscountDocument>,
    @InjectModel(Shop.name)
    private shopModel: Model<ShopDocument>,
  ) {}

  async createDiscount(discount: CreateDiscountDto) {
    const newDiscount = new this.discountModel(discount);
    return newDiscount.save();
  }
  async getDiscountById(discountId: string) {
    return this.discountModel.findOne({ _id: discountId }).exec();
  }
  async updateDiscount(discount: UpdateDiscountDto) {
    const res = await this.discountModel.findOneAndUpdate(
      { _id: discount._id },
      {
        $set: { ...discount },
      },
      { new: true },
    );
    return res;
  }

  async removeDiscount(discountId: string) {
    const shops = await this.shopModel.find({ discount: discountId });

    if (shops.length > 0) {
      for (const shop of shops) {
        await this.shopModel.findByIdAndUpdate(shop._id.valueOf(), {
          $pull: {
            discount: discountId,
          },
        });
      }
    }
    const discount = await this.discountModel.findById(discountId);
    this.filesService.removeFile('./uploads/' + discount.image);

    return await this.discountModel.findByIdAndDelete(discountId);
  }
}
