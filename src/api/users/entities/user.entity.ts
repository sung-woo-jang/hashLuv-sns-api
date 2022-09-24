import { CommonEntity } from './../../../common/entities/common-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Board } from './../../../api/boards/entities/board.entity';
import { Love } from './../../../api/boards/entities/love.entity';

@Entity()
export class User extends CommonEntity {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Column()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*?[0-9]).{6,}$/, {
    message:
      '비밀번호는 6자 이상이어야 하고, 숫자 1개 이상 반드시 포함 되어야 합니다.',
  })
  password: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => Board, (board) => board.user)
  board: Board[];

  @OneToMany(() => Love, (love) => love.board)
  love: Love;
}
