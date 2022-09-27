import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPagePipe implements PipeTransform {
  transform(value: number, metadata: ArgumentMetadata) {
    if (value <= 0 || !value) return 1;
    return value;
  }
}
