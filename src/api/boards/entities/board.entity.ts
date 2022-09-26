import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { User } from './../../../api/users/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { CommonEntity } from './../../../common/entities/common-entity';
import { Love } from './love.entity';
import { HashTag } from './hashTag.entity';

@Entity()
export class Board extends CommonEntity {
  @IsNotEmpty()
  @Column({ comment: '게시글 제목입니다.' })
  title: string;

  @IsNotEmpty()
  @Column({ comment: '게시글 내용입니다,' })
  description: string;

  @IsNumber()
  @Column({ comment: '게시글 조회수 입니다.', default: 0 })
  viewCount: number;

  @ManyToOne(() => User, (user) => user.board, { cascade: true })
  user: User;

  @OneToMany(() => Love, (love) => love.board)
  love: Love[];

  @ManyToMany(() => HashTag, (hashtag) => hashtag.boards, {
    onDelete: 'CASCADE',
  })
  @IsArray()
  hashtags: HashTag[];
}
