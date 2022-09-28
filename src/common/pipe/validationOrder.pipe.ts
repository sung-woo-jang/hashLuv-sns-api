import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationOrderPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (value === 'createAt' || value === 'viewCount') return value;
    return 'createAt';
  }
}
