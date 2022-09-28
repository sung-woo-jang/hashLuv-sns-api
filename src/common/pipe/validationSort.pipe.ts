import {
  ArgumentMetadata,
  Injectable,
  InternalServerErrorException,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidationSortPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (value === 'ASC' || value === 'DESC') return value;
    return 'ASC';
  }
}
