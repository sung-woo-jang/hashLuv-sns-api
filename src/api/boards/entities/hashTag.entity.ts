import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { CommonEntity } from './../../../common/entities/common-entity';
import { Board } from './board.entity';

@Entity()
export class HashTag extends CommonEntity {
  @ApiProperty({
    example: '#맛집',
    description: '게시글 태그입니다.',
    required: false,
  })
  @IsString()
  @Column({})
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
