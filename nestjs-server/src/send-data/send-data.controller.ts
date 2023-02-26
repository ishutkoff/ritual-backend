import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { dataCalculatorObjectDto, dataConstructorObjectDto } from './dto';
import { SendDataService } from './send-data.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';

@Controller('send-data')
export class SendDataController {
  constructor(private sendDataService: SendDataService) {}
  @Post('/calculator/')
  async sendCalculator(@Body() dataObject: dataCalculatorObjectDto) {
    await this.sendDataService.sendCalculator(dataObject);
  }
  @Post('/constructor/')
  @UseInterceptors(
    FileInterceptor('document', {
      storage: diskStorage({
        destination: './uploads/temp',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(
    // @UploadedFile() file,
    @Body() dataObject: dataConstructorObjectDto,
  ) {
    await this.sendDataService.sendConstructor(dataObject);
    // const response = {
    //   originalname: file.originalname,
    //   filename: file.filename,
    // };
    // await this.sendDataService.sendConstructor(dataObject, response.filename);
  }

  // @ApiConsumes('multipart/form-data')
  // @ApiFile('avatar')
  // @UseInterceptors(FileInterceptor('document'))
  // async sendConstructor(
  //   @Body() payload: any,
  //   @UploadedFile('document') document,
  // ) {
  //   console.log(document);
  //   // console.log(document);
  //   console.log(payload);

  // }
}
