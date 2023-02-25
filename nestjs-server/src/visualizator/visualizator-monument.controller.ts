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
import { JwtAuthGuard } from '../guards/jwt-guard';
import { VisualizatorMonumentsService } from './visualizator-monuments.service';
import { CreateVisualizatorMonumenthDto } from './dto/visualizator-monument.dto';

@Controller('monument')
export class VisualizatorMonumentController {
  constructor(
    private visualizatorMonumentsService: VisualizatorMonumentsService,
  ) {}

  @Get(':monument_id')
  async getMonumentById(@Param('monument_id') monument_id: string) {
    return await this.visualizatorMonumentsService.getMonumentById(monument_id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createMonument(@Body() monument: CreateVisualizatorMonumenthDto) {
    return await this.visualizatorMonumentsService.createMonument({
      title: monument.title,
      image: monument.image,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':monument_id')
  async removeMonument(@Param('monument_id') monument_id: string) {
    return await this.visualizatorMonumentsService.removeMonument(monument_id);
  }
}
