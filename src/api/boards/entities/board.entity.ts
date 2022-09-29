import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { User } from './../../../api/users/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { CommonEntity } from './../../../common/entities/common-entity';
import { Love } from './love.entity';
import { HashTag } from './hashTag.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Board extends CommonEntity {
  @ApiProperty({
    example: '게시글 제목입니다.',
    required: true,
  })
  @IsNotEmpty()
  @Column({ comment: '게시글 제목입니다.' })
  title: string;

  @ApiProperty({
    example: '게시글 본문입니다.',
    required: true,
  })
  @IsNotEmpty()
  @Column({ comment: '게시글 본문입니다,' })
  description: string;

  @ApiProperty({
    example: 4,
    description: '게시글 조회수 입니다.',
    required: true,
  })
  @IsNumber()
  @Column({ comment: '게시글 조회수 입니다.', default: 0 })
  viewCount: number;

  @ApiProperty({
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.board, { cascade: true })
  user: User;

  @ApiProperty({
    type: () => Love,
  })
  @OneToMany(() => Love, (love) => love.board)
  love: Love[];

  @ApiProperty({
    type: () => HashTag,
  })
  @ManyToMany(() => HashTag, (hashtag) => hashtag.boards, {
    cascade: true,
  })
  @IsArray()
  hashtags: HashTag[];
}
