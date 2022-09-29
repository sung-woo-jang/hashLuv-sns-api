import { User } from './../../../api/users/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from './../../../common/entities/common-entity';
import { Board } from './board.entity';

@Entity()
export class Love extends CommonEntity {
  @ManyToOne(() => Board, (board) => board.love, { onDelete: 'CASCADE' })
  board: Board;

  @ManyToOne(() => User, (user) => user.love, { onDelete: 'CASCADE' })
  user: User;
}
