import { IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { CommonEntity } from './../../../common/entities/common-entity';
import { Board } from './board.entity';

@Entity()
export class HashTag extends CommonEntity {
  @IsString()
  @Column({})
  keyword: string;

  @ManyToMany(() => Board, (board) => board.hashtags)
  @JoinTable({
    name: 'hashtag_board',
  })
  boards: Board[];
}
