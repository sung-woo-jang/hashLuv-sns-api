import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update.board.dto';
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

  async updateBoard(id: number, updateBoardDto: UpdateBoardDto) {
    //    TODO: 사용자 검증

    // TODO: Body내용 원본이랑 교체

    const board = await this.boardRepository
      .createQueryBuilder()
      .update(Board)
      .set({ ...updateBoardDto })
      .where('id = :id', { id })
      .execute();

    return board;
  }

  async deleteBoard(id: number) {
    const board = await this.boardRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!board) throw new HttpException('Not found', 404);

    //    TODO: 사용자 검증

    // 이미 삭제된 게시물이라면 복구
    if (board.deleteAt) await this.boardRepository.restore({ id });
    // 아니면 softDelete
    else await this.boardRepository.softDelete({ id });
    // return '';
  }
}
