import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateDiscountDto, UpdateDiscountDto } from './dto';
import { DiscountsService } from './discounts.service';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('discounts')
export class DiscountsController {
  constructor(private discountsService: DiscountsService) {}

  @Get(':discountId')
  async getDiscountById(@Param('discountId') discountId: string) {
    return await this.discountsService.getDiscountById(discountId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createDiscount(@Body() discount: CreateDiscountDto) {
    return await this.discountsService.createDiscount({
      title: discount.title,
      image: discount.image,
      discount: discount.discount,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateDiscount(@Body() @Body() discount: UpdateDiscountDto) {
    return await this.discountsService.updateDiscount({
      _id: discount._id,
      title: discount.title,
      image: discount.image,
      discount: discount.discount,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':discountId')
  async removeDiscount(@Param('discountId') discountId: string) {
    return await this.discountsService.removeDiscount(discountId);
  }
}
