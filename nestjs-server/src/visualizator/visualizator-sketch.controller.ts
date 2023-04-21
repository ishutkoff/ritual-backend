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
import { VisualizatorSketchesService } from './visualizator-sketches.service';
import { CreateVisualizatorSketchDto } from './dto/visualizator-sketch.dto';

@Controller('sketch')
export class VisualizatorSketchController {
  constructor(
    private visualizatorSketchesService: VisualizatorSketchesService,
  ) {}

  @Get(':sketch_id')
  async getSketchById(@Param('sketch_id') sketch_id: string) {
    return await this.visualizatorSketchesService.getSketchById(sketch_id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('')
  async createSketch(@Body() sketch: CreateVisualizatorSketchDto) {
    return await this.visualizatorSketchesService.createSketch({
      title: sketch.title,
      image: sketch.image,
      categoryId: sketch.categoryId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':sketch_id')
  async removeSketch(@Param('sketch_id') sketch_id: string) {
    return await this.visualizatorSketchesService.removeSketch(sketch_id);
  }
}
