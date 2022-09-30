import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { CommonEntity } from './../../../common/entities/common-entity';
import { Board } from './board.entity';

@Entity()
export class HashTag extends CommonEntity {
  @ApiProperty({
    example: '#맛집',
    description: '게시글 태그입니다.',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: '해시태그는 필수 입력사항입니다.' })
  @Column({ nullable: false })
  keyword: string;

  @ApiProperty({
    type: Board,
  })
  @ManyToMany(() => Board, (board) => board.hashtags)
  @JoinTable({
    name: 'hashtag_board',
  })
  boards: Board[];
}
