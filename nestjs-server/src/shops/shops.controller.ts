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
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { CreateShopDto, UpdateShopDto } from './dto';
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
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createShop: CreateShopDto) {
    return await this.shopsService.createShop(createShop);
  }

  @UseGuards(JwtAuthGuard)
  @Put('insert-product/:shopId')
  async insertProduct(@Param('shopId') shopId: string, @Body() body: string[]) {
    return await this.shopsService.insertProducts(shopId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('insert-service/:shopId')
  async insertService(@Param('shopId') shopId: string, @Body() body: string[]) {
    return await this.shopsService.insertService(shopId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateShop(@Body() shop: UpdateShopDto) {
    return await this.shopsService.updateShop(shop);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':shopId')
  async removeShop(@Param('shopId') shopId: string) {
    return await this.shopsService.removeShop(shopId);
  }
}
