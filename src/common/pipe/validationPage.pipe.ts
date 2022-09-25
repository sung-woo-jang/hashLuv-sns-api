import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPagePipe implements PipeTransform {
  transform(value: number, metadata: ArgumentMetadata) {
    if (value <= 0) return 1;
    return value;
  }
}
