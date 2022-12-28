import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopsModule } from './shops/shops.module';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { FilesModule } from './files/files.module';
import { ServicesModule } from './services/services.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { UsersModule } from './users/users.module';
import configurations from './configurations';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodbUrl')
      }),
      inject: [ConfigService]
    }),
    ShopsModule,
    ProductsModule,
    FilesModule,
    ServicesModule,
    CategoriesModule,
    TokenModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [configurations],
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    AuthModule,
    TokenModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
