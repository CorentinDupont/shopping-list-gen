import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import {Deserializer} from 'jsonapi-serializer';

@Injectable()
export class JsonapiPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(metadata)
    console.log(value)
    return new Deserializer({}).deserialize(value);
  }
}

