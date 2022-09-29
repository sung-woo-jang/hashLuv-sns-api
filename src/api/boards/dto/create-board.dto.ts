import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Board } from '../entities/board.entity';

export class CreateBoardDto extends PickType(Board, [
  'title',
  'description',
] as const) {
  @ApiProperty({
    example: ['#맛집', '#서울'],
    description: '게시글 태그입니다.',
    required: false,
  })
  @IsArray()
  hashtags: string[];
}
