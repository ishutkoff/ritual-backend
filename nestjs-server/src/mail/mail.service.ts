import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ShopsService } from 'src/shops/shops.service';
import { Shop } from 'src/schemas/shop.schema';

interface orderItem {
  _id: string;
  category: string;
  price: number;
  title: string;
}

interface dataObject {
  shopId: string;
  name: string;
  phone: string;
  orderList: orderItem[];
}

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly shopsService: ShopsService,
  ) {}

  public async sendMail(dataObject: dataObject): Promise<void> {
    const { name, phone, orderList } = dataObject;
    const shopData: Shop = await this.shopsService.getShopById(
      dataObject.shopId,
    );
    console.log(shopData);

    this.mailerService
      .sendMail({
        to: shopData.email,
        from: shopData.email,
        subject: `Сообщение из калькулятора с сайта ${shopData.domain}`,
        template: __dirname + '/sendData',
        context: { name, phone, orderList },
      })
      .then(() => {
        console.log('OK');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
