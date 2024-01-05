import { PipeTransform, Injectable, ArgumentMetadata, ParseIntPipe, BadRequestException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { PageQuery } from '../http/page-query.type';

@Injectable()
export class PageQueryPipe implements PipeTransform<any> {

  transform(value: PageQuery, metadata: ArgumentMetadata): PageQuery {

      return {
        limit: !isNaN(Number(value.limit)) ? Number(value.limit) : undefined,
        page: !isNaN(Number(value.page)) ? Number(value.page) : undefined,
        offset: !isNaN(Number(value.offset)) ? Number(value.offset) : undefined,
        sort: value.sort ?? []
      }

  }
}