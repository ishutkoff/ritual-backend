import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { ShopsService } from './shops.service';

@Controller('shops')
export class ShopsController {
  constructor(private shopsService: ShopsService) {}

  @Get('')
  async getAllShops() {
    return await this.shopsService.getAllShops();
  }

  @Get(':shopId')
  async getOne(@Param('shopId') shopId: string) {
    return await this.shopsService.getShopById(shopId);
  }

  @Post()
  async create(@Body() createShop: CreateShopDto) {
    return await this.shopsService.createShop(createShop);
  }

  @Put('insert-product/:shopId')
  async insertProduct(@Param('shopId') shopId: string, @Body() body: string[]) {
    return await this.shopsService.insertProducts(shopId, body);
  }

  @Put('insert-service/:shopId')
  async insertService(@Param('shopId') shopId: string, @Body() body: string[]) {
    return await this.shopsService.insertService(shopId, body);
  }

  @Put(':shopId')
  async updateShop(@Param('shopId') shopId: string, @Body() body: any) {
    return await this.shopsService.updateShop(shopId, body);
  }

  @Delete(':shopId')
  async removeShop(@Param('shopId') shopId: string) {
    return await this.shopsService.removeShop(shopId);
  }
}
