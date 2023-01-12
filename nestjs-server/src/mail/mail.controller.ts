import { Body, Controller, Post } from '@nestjs/common';
import { dataObjectDto } from './dto';
import { MailService } from './mail.service';

@Controller('mailer')
export class MailerController {
  constructor(private mailService: MailService) {}
  @Post('send')
  async sendData(@Body() dataObject: dataObjectDto) {
    await this.mailService.sendMail(dataObject);
  }
}
