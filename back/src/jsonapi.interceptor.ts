import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {ItemSerializer} from './item/item.serializer';

@Injectable()
export class JsonapiInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
    .handle()
    .pipe(
      map(data => {
        const path = context.getArgByIndex(0).path;
        if (path.includes('items')) {
          return ItemSerializer.serialize(data)};
      }));
  }

}
