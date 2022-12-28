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
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get(':productId')
  async getProductById(@Param('productId') productId: string) {
    return await this.productsService.getProductById(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createProduct(@Body() product: CreateProductDto) {
    return await this.productsService.createProduct({
      title: product.title,
      image: product.image,
      price: product.price,
      category: product.category,
      burial: product.burial,
      cremation: product.cremation,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateProduct(@Body() @Body() product: UpdateProductDto) {
    return await this.productsService.updateProduct({
      _id: product._id,
      title: product.title,
      image: product.image,
      price: product.price,
      category: product.category,
      burial: product.burial,
      cremation: product.cremation,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':shopId')
  async removeProduct(@Param('shopId') shopId: string) {
    return await this.productsService.removeProduct(shopId);
  }
}
