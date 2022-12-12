import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopsModule } from './shops/shops.module';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { FilesModule } from './files/files.module';
import { ServicesModule } from './services/services.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    ShopsModule,
    ProductsModule,
    FilesModule,
    ServicesModule,
    GroupsModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
