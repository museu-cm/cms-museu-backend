import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ImagesController],
})
export class ImagesModuleModule {}
