import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import * as fs from 'fs';
import { ShopsService } from 'src/shops/shops.service';
import { dataConstructorObjectDto, dataCalculatorObjectDto } from './dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class SendDataService {
  constructor(
    private readonly httpService: HttpService,
    private readonly shopsService: ShopsService,
    private readonly filesService: FilesService,
  ) {}

  async sendCalculator(dataObject: dataCalculatorObjectDto) {
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
      .toLocaleString('ru')} ₽%0A`;
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

  async sendConstructor(dataObject: dataConstructorObjectDto) {
    const shop = await this.shopsService.getShopById(dataObject.shopId);
    const apiKey = shop.telegramApiKey;
    const chatId = shop.chatId;
    let html = `<strong>Данные покупателя:</strong>\n`;
    html += `Имя: ${dataObject.name}\n`;
    html += `Телефон: ${dataObject.phone}\n`;

    const form = new FormData();
    const base64Data = dataObject.document.replace(
      /^data:image\/png;base64,/,
      '',
    );
    fs.writeFile(
      './uploads/temp/send.png',
      base64Data,
      'base64',
      function (err) {
        console.log(err);
      },
    );
    form.append('chat_id', chatId);
    form.append('caption', html);
    form.append('parse_mode', 'HTML');
    // @ts-ignore
    form.append('document', fs.createReadStream(`./uploads/temp/send.png`));

    await this.httpService
      .post(`https://api.telegram.org/bot${apiKey}/sendDocument`, form)
      .toPromise();
    await this.filesService.removeFile(`./uploads/temp/send.png`);
  }
}
