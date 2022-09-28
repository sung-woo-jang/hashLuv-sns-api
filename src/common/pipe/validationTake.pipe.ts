import {
  ArgumentMetadata,
  HttpException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidationTakePipe implements PipeTransform {
  transform(value: number, metadata: ArgumentMetadata) {
    if (!value || value <= 0) return 10;

    if (value > 20)
      throw new HttpException('최대 20개까지만 조회가 가능합니다.', 400);
    // if () return 10;
    return value;
  }
}
