import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { CommonEntity } from './../../../common/entities/common-entity';

@Entity()
export class HashTag extends CommonEntity {
  @IsString()
  @IsNotEmpty()
  @Column({})
  hash_tag: string;
}
