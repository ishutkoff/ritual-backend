import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-guard';
import { VisualizatorCategoryService } from './visualizator-category.service';
import {
  CreateVisualizatorCategoryDto,
  UpdateVisualizatorCategoryDto,
} from './dto/visualizator-category.dto';

@Controller('sketch-categories')
export class VisualizatorCategoryController {
  constructor(
    private visualizatorCategoryService: VisualizatorCategoryService,
  ) {}
  @Get('/')
  async getAllCategories(@Query('shop_id') shop_id: string) {
    return await this.visualizatorCategoryService.getAllCategories(shop_id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('')
  async createCategory(@Body() category: CreateVisualizatorCategoryDto) {
    return await this.visualizatorCategoryService.createCategory({
      title: category.title,
      shopId: category.shopId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateCategory(@Body() category: UpdateVisualizatorCategoryDto) {
    return await this.visualizatorCategoryService.updateCategory({
      _id: category._id,
      title: category.title,
      shopId: category.shopId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':categoryId')
  async removeCategory(@Param('categoryId') categoryId: string) {
    return await this.visualizatorCategoryService.removeCategory(categoryId);
  }
}
