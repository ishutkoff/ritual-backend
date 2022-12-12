import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('')
  async getAllShops() {
    return await this.productsService.getAllProducts();
  }

  @Get(':productId')
  async getProductById(@Param('productId') productIs: string) {
    return await this.productsService.getProductById(productIs);
  }

  @Post('')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createProduct(@Body() product: CreateProductDto, @UploadedFile() file) {
    return await this.productsService.createProduct({
      title: product.title,
      image: file.filename,
      price: product.price,
      group: product.group,
      burial: product.burial,
      cremation: product.cremation,
    });
  }

  @Put(':productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() body: UpdateProductDto,
  ) {
    return await this.productsService.updateProduct(productId, body);
  }

  @Put('set-group/:productId')
  async setGroup(@Param('productId') productId: string, @Body() body: any) {
    return await this.productsService.setGroup(productId, body.groupId);
  }

  @Delete(':shopId')
  async removeProduct(@Param('shopId') shopId: string) {
    return await this.productsService.removeProduct(shopId);
  }
}
