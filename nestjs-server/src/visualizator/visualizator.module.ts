import { Module } from '@nestjs/common';
import { VisualizatorCategoryController } from './visualizator-category.controller';
import { VisualizatorCategoryService } from './visualizator-category.service';
import { VisualizatorSketchesService } from './visualizator-sketches.service';
import { VisualizatorMonumentsService } from './visualizator-monuments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VSketch, VSketchSchema } from '../schemas/visualizator-sketch.schema';
import {
  VMonument,
  VMonumentSchema,
} from '../schemas/visualizator-monument.schema';
import {
  VCategory,
  VCategorySchema,
} from '../schemas/visualizator-category.schema';
import { Shop, ShopSchema } from '../schemas/shop.schema';
import { FilesModule } from '../files/files.module';
import { VisualizatorSketchController } from './visualizator-sketch.controller';
import { VisualizatorMonumentController } from './visualizator-monument.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
    MongooseModule.forFeature([{ name: VSketch.name, schema: VSketchSchema }]),
    MongooseModule.forFeature([
      { name: VCategory.name, schema: VCategorySchema },
    ]),
    MongooseModule.forFeature([
      { name: VMonument.name, schema: VMonumentSchema },
    ]),
    FilesModule,
  ],
  providers: [
    VisualizatorCategoryService,
    VisualizatorSketchesService,
    VisualizatorMonumentsService,
  ],
  controllers: [
    VisualizatorCategoryController,
    VisualizatorSketchController,
    VisualizatorMonumentController,
  ],
  exports: [
    VisualizatorSketchesService,
    VisualizatorCategoryService,
    VisualizatorMonumentsService,
  ],
})
export class VisualizatorModule {}
