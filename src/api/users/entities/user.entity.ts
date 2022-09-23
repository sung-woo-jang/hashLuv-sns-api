import { CommonEntity } from './../../../common/entities/common-entity';
import { Column, Entity } from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

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
}
