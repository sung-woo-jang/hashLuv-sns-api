import {
  ArgumentMetadata,
  HttpException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidationTakePipe implements PipeTransform {
  transform(value: number, metadata: ArgumentMetadata) {
    if (!value) return 10;

    if (value > 20)
      throw new HttpException('최대 20개까지만 조회가 가능합니다.', 400);
    if (value <= 0) return 1;
    return value;
  }
}
