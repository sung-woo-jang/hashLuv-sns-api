import { IsNotEmpty } from 'class-validator';
import { User } from './../../../api/users/entities/user.entity';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { CommonEntity } from './../../../common/entities/common-entity';
import { Board } from './board.entity';

@Entity()
export class Love extends CommonEntity {
  // @IsNotEmpty()
  // @Column({ default: false })
  // status: boolean;

  @ManyToOne(() => Board, (board) => board.love, { onDelete: 'CASCADE' })
  board: Board;

  @ManyToOne(() => User, (user) => user.love, { onDelete: 'CASCADE' })
  user: User;
}
