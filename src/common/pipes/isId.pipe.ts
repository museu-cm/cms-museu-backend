import { PipeTransform, Injectable, ArgumentMetadata, ParseIntPipe, BadRequestException, NotAcceptableException } from '@nestjs/common';

@Injectable()
export class IsId implements PipeTransform<number, number> {

  transform(value: number, metadata: ArgumentMetadata) {
      if (value > 0) {
          return value;
      }

      throw new NotAcceptableException("The path param 'id' must be a id representation (unsigned integer number)");
  }
}