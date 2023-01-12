import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { ShopsService } from 'src/shops/shops.service';
import { dataObjectDto } from './dto';

@Injectable()
export class SendDataService {
  constructor(
    private readonly httpService: HttpService,
    private readonly shopsService: ShopsService,
  ) {}

  async getChatId(token: string) {
    const res = await this.httpService
      .get(`https://api.telegram.org/bot${token}/getUpdates`)
      .toPromise();
    return res.data.result[0].message.chat.id;

    // .result.update_id
  }

  async send(dataObject: dataObjectDto) {
    const shop = await this.shopsService.getShopById(dataObject.shopId);
    const apiKey = shop.telegramApiKey;
    const chatId = await this.getChatId(apiKey);
    let html = `<strong>Состав заказа:</strong>%0A`;
    dataObject.orderList.forEach((item) => {
      html += `<strong>${item.title}</strong> - ${item.price} ₽%0A`;
    });
    html += `<strong>Данные покупателя:</strong>%0A`;
    html += `Имя: ${dataObject.name}%0A`;
    html += `Телефон: ${dataObject.phone}%0A`;
    await this.httpService
      .get(
        `https://api.telegram.org/bot${apiKey}/sendMessage?chat_id=${chatId}&text=${html}&parse_mode=html`,
      )
      .toPromise();
  }
}
