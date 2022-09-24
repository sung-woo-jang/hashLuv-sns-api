import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto, user) {
    const { description, title } = createBoardDto;

    // TODO: function 해시태그 구분 함수

    const query = this.boardRepository
      .createQueryBuilder('board')
      .insert()
      .into(Board)
      .values({ description, title, user: user.sub });
    await query.execute();
  }
}
