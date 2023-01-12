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
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import configurations from './configurations';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { SendDataService } from './send-data/send-data.service';
import { SendDataController } from './send-data/send-data.controller';
import { HttpModule } from '@nestjs/axios/dist';
@Module({
  imports: [
    MailerModule.forRoot({
      transport:
        'smtps://trikolicludmila45@gmail.com:Zz43255123@smtp.gmail.com',
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodbUrl'),
      }),
      inject: [ConfigService],
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
    HttpModule,
    TokenModule,
    UsersModule,
  ],
  controllers: [AppController, SendDataController, SendDataController],
  providers: [AppService, ConfigService, SendDataService, SendDataService],
})
export class AppModule {}
