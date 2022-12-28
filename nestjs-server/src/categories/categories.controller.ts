import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('/')
  async getAllCategories(@Query('shop_id') shop_id:string) {
    return await this.categoriesService.getAllCategories(shop_id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCategory(@Body() category: CreateCategoryDto) {
    return await this.categoriesService.createCategory(category);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() body: UpdateCategoryDto,
  ) {
    return await this.categoriesService.updateCategory(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':categoryId')
  async removeCategory(@Param('categoryId') categoryId: string) {
    return await this.categoriesService.removeCategory(categoryId);
  }
}
