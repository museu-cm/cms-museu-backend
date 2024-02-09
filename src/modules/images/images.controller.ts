import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, promises as asyncFs } from 'fs';
import { v4 as uuidV4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import { ImagesService } from './images.service';

function getExtensionFile(fileName: string): string {
  const splittedName = fileName.split('.');
  return splittedName[splittedName.length - 1];
}

@Controller('images')
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileName = `${uuidV4()}.${getExtensionFile(file.originalname)}`;

    const _dirname = path.resolve();
    const absoluteFilePath = path.join(_dirname, 'files', 'images', fileName);
    await asyncFs.writeFile(
      absoluteFilePath,
      file.buffer as NodeJS.ArrayBufferView,
    );

    console.log(absoluteFilePath);

    // const image = await this.imagesService.image.create({
    //   data: {
    //     fileName: fileName,
    //     size: file.size,
    //   },
    // });

    // return {
    //   id: image.id,
    //   link: `http://localhost:3000/image/get/${image.fileName}`,
    // };
  }

  // @Get('get/:fileName')
  // async getFile(
  //   @Res() response: Response,
  //   @Param('fileName') fileName: string,
  // ) {
  //   const fileAbsolutePath = path.join(
  //     path.resolve(),
  //     'files',
  //     'images',
  //     fileName,
  //   );
  //   if (!fs.existsSync(fileAbsolutePath)) throw new NotFoundException();
  //   response.sendFile(fileAbsolutePath);
  //   // createReadStream(fileAbsolutePath).pipe(response);
  // }

  // @Get('/list')
  // async listFiles() {
  //   const images = await this.imagesService.image.findMany({
  //     select: { id: true, fileName: true, size: true },
  //   });

  //   return images;
  // }
}
