import { Injectable } from '@nestjs/common';
import { Shop, ShopDocument } from './schemas/shop.schema';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
