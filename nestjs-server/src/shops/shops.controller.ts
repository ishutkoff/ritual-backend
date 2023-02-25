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
import { RequestSource } from './types';

@Controller('shops')
export class ShopsController {
  constructor(private shopsService: ShopsService) {}

  @Get('')
  async getAllShops() {
    return await this.shopsService.getAllShops();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':shopId')
  async getOne(@Param('shopId') shopId: string) {
    return await this.shopsService.getShopById(shopId);
  }
  @Get('/calculator/:shopId')
  async getOneForCalculator(@Param('shopId') shopId: string) {
    return await this.shopsService.getShopById(
      shopId,
      RequestSource.CALCULATOR,
    );
  }
  @Get('/vusualizator/:shopId')
  async getOneForVisualizator(@Param('shopId') shopId: string) {
    return await this.shopsService.getShopById(
      shopId,
      RequestSource.VISUALIZATOR,
    );
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
  @Put('insert-sketch/:shopId')
  async insertSketch(@Param('shopId') shopId: string, @Body() body: string[]) {
    return await this.shopsService.insertSketches(shopId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('insert-monument/:shopId')
  async insertMonument(
    @Param('shopId') shopId: string,
    @Body() body: string[],
  ) {
    return await this.shopsService.insertMonuments(shopId, body);
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
