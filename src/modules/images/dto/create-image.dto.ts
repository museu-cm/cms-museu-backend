import { PickType } from '@nestjs/mapped-types';
import { Image } from '@src/entities/image.entity';

export class CreateImageDto extends PickType(
  Image,
  ["hash", "fileName", "size"]
){
}
