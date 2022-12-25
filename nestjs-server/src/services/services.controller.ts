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
import { CreateServiceDto, UpdateServiceDto } from './dto';
import { ServicesService } from './services.service';

@Controller('services')
export class ProductsController {
  constructor(private servicesService: ServicesService) {}

  @Get('')
  async getAllServices() {
    return await this.servicesService.getAllServices();
  }

  @Get(':serviceId')
  async getServiceById(@Param('serviceId') serviceId: string) {
    return await this.servicesService.getServiceById(serviceId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createService(@Body() service: CreateServiceDto) {
    return await this.servicesService.createService({
      title: service.title,
      price: service.price,
      category: service.category,
      burial: service.burial,
      cremation: service.cremation,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateProduct(@Body() body: UpdateServiceDto) {
    return await this.servicesService.updateService(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':serviceId')
  async removeService(@Param('serviceId') serviceId: string) {
    return await this.servicesService.removeService(serviceId);
  }
}
