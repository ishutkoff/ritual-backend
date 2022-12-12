import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesService } from './services.service';

@Controller('services')
export class ProductsController {
  constructor(private servicesService: ServicesService) {}

  @Get('')
  async getAllServices() {
    return await this.servicesService.getAllServices();
  }

  @Get(':productId')
  async getServiceById(@Param('productId') productIs: string) {
    return await this.servicesService.getServiceById(productIs);
  }

  @Post('')
  async createProduct(@Body() service: CreateServiceDto) {
    return await this.servicesService.createService({
      title: service.title,
      price: service.price,
      group: service.group,
      burial: service.burial,
      cremation: service.cremation,
    });
  }

  @Put(':productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() body: UpdateServiceDto,
  ) {
    return await this.servicesService.updateService(productId, body);
  }

  @Delete(':serviceId')
  async removeService(@Param('serviceId') serviceId: string) {
    return await this.servicesService.removeService(serviceId);
  }
}
