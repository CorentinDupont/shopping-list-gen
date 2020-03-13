import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {ItemSerializer} from './item/item.serializer';
import {UserSerializer} from './user/user.serializer';

@Injectable()
export class JsonapiInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
    .handle()
    .pipe(
      map(data => {
        const path = context.getArgByIndex(0).path;
        console.log(path)
        if (path.includes('items')) {
          console.log(data)
          return ItemSerializer.serialize(data)
        } else if (path.includes('users')) {
          console.log("userserializer")
          return UserSerializer.serialize(data)
        }
      }
    ));
  }

}
