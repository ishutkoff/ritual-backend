import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  async removeFile(path: string) {
    await fs.unlink(path, (error) => {
      console.log(error);
    });
  }
}
