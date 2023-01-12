import { Body, Controller, Post } from '@nestjs/common';
import { dataObjectDto } from './dto';
import { SendDataService } from './send-data.service';

@Controller('send-data')
export class SendDataController {
  constructor(private sendDataService: SendDataService) {}
  @Post()
  async sendData(@Body() dataObject: dataObjectDto) {
    await this.sendDataService.send(dataObject);
  }
}
