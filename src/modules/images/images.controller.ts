import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { promises as asyncFs } from 'fs';
import { v4 as uuidV4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import { ImageRepository } from '@src/repositories/image.repository';

function getExtensionFile(fileName: string): string {
  const splittedName = fileName.split('.');
  return splittedName[splittedName.length - 1];
}

@Controller('images')
export class ImagesController {
  constructor(
    private readonly imageRepository: ImageRepository,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const hash = uuidV4()
    const fileName = `${hash}.${getExtensionFile(file.originalname)}`;

    const _dirname = path.resolve();
    const absoluteFilePath = path.join(_dirname, 'files', 'images', fileName);

    await asyncFs.writeFile(
      absoluteFilePath,
      file.buffer as NodeJS.ArrayBufferView,
    );

    console.log(absoluteFilePath);

    return await this.imageRepository.create({ hash, fileName, size: file.size })
  }

  @Get(':hash')
  async getFile(
    @Res() response: Response,
    @Param('hash') hash: string,
  ) {

    const image = await this.imageRepository.findByHash(hash);

    if(!image) throw new NotFoundException();

    const fileName = image.fileName;

    const fileAbsolutePath = path.join(
      path.resolve(),
      'files',
      'images',
      fileName,
    );
    if (!fs.existsSync(fileAbsolutePath)) throw new NotFoundException();
    response.sendFile(fileAbsolutePath);
    // createReadStream(fileAbsolutePath).pipe(response);
  }

  @Get()
  async listFiles() {
    return await this.imageRepository.findAll()
  }

  @Delete(':hash')
  async remove(@Param('hash') hash: string) {

    const image = await this.imageRepository.findByHash(hash);

    if(!image) throw new NotFoundException();

    const fileName = image.fileName;

    const fileAbsolutePath = path.join(
      path.resolve(),
      'files',
      'images',
      fileName,
    );

    if (fs.existsSync(fileAbsolutePath)){
      fs.unlinkSync(fileAbsolutePath);
    }

    await this.imageRepository.deleteById(image.id);
  }
}
