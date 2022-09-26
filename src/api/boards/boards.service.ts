import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update.board.dto';
import { Board } from './entities/board.entity';
import { Love } from './entities/love.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(Love)
    private lovesRepository: Repository<Love>,
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

    // for (let i = 1; i <= 25; i++) {
    //   query.values({ description, title: `${i} - ${title}`, user: user.sub });
    //   await query.execute();
    // }
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
  }

  async getBoardDetail(id: number) {
    const query = this.boardRepository
      .createQueryBuilder()
      .where('board.id = :id', { id });

    // 조회수 증가
    await query
      .update(Board)
      .set({ viewCount: () => 'view_count + 1' })
      .execute();

    // 게시글 상세 조회
    const board = await query
      .leftJoinAndSelect('board.user', 'user')
      .select([
        'board.title AS 제목',
        'board.description AS 내용',
        'board.createAt AS 작성일',
        'board.viewCount AS 조회수',
        'user.name AS 작성자',
      ])
      .getRawOne();

    return board;
  }

  async like(id: number, user) {
    // 게시글을 찾는다.
    const board = await this.boardRepository.findOne({ where: { id } });

    if (!board) throw new NotFoundException('게시글 없음');

    const like = await this.lovesRepository.findOne({
      relations: { board: true },
      where: { board: { id }, user: { id: user.sub } },
      withDeleted: true,
    });

    const query = this.lovesRepository.createQueryBuilder('love');
    let result;

    if (!like) {
      result = await query
        .insert()
        .into(Love)
        .values({ user: user.sub, board })
        .execute();
    } else if (!like.deleteAt) {
      result = await query.where({ id: like.id }).softDelete().execute();
    } else if (like.deleteAt) {
      result = await query.where({ id: like.id }).restore().execute();
    }

    return result;
  }

  async getBoardList(options) {
    const { sort, search, filter, take, page } = options;

    const query = this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.user', 'user');

    // TODO: 정렬(default: 작성일 / 작성일, 좋아요 수, 조회수 택 1)
    // TODO: 오름차순, 내림차순

    // 검색(제목)
    if (search)
      query.orWhere('board.title Like :title', { title: `%${search}%` });
    // TODO: 필터링(해시태그)

    // 페이지(defalut:10)
    query.limit(take).offset(take * (page - 1));

    const result = await query
      .select([
        'board.title AS 제목',
        'board.description AS 내용',
        'board.createAt AS 작성일',
        'board.viewCount AS 조회수',
        'user.name AS 작성자',
      ])
      .getRawMany();

    return { length: result.length, result };
  }
}
