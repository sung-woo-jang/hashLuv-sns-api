import { IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { CommonEntity } from './../../../common/entities/common-entity';

@Entity()
export class Love extends CommonEntity {
  @IsNumber()
  @IsNotEmpty()
  @Column({ default: 0 })
  loveCount: number;
}
