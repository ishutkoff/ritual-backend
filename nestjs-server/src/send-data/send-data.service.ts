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

  async send(dataObject: dataObjectDto) {
    const shop = await this.shopsService.getShopById(dataObject.shopId);
    const apiKey = shop.telegramApiKey;
    const chatId = shop.chatId;
    let html = `<strong>Данные покупателя:</strong>%0A`;
    html += `Имя: ${dataObject.name}%0A`;
    html += `Телефон: ${dataObject.phone}%0A`;
    html += `<strong>Сумма заказа:</strong> ${dataObject.orderList
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.price,
        0,
      )
      .toLocaleString('ru')} ₽`;
    html += `<strong>Состав заказа:</strong>%0A`;
    dataObject.orderList.forEach((item) => {
      html += `<strong>${item.title}</strong> - ${item.price} ₽%0A`;
    });

    await this.httpService
      .get(
        `https://api.telegram.org/bot${apiKey}/sendMessage?chat_id=${chatId}&text=${html}&parse_mode=html`,
      )
      .toPromise();
  }
}
