import {
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userInfo } from 'os';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update.board.dto';
import { Board } from './entities/board.entity';
import { HashTag } from './entities/hashTag.entity';
import { Love } from './entities/love.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(Love)
    private lovesRepository: Repository<Love>,
    @InjectRepository(HashTag)
    private hashTagsRepository: Repository<HashTag>,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto, user) {
    const { description, title, hashtags } = createBoardDto;

    // TODO: function 해시태그 구분 함수
    try {
      const board = await this.boardRepository.save({
        description,
        title,
        user: user.sub,
      });
      if (hashtags.length) await this.createHashTag(board.id, hashtags);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  private async createHashTag(boardId: number, hashtags) {
    try {
      for (const keyword of hashtags) {
        // 해시태그 테이블 조회
        let hashtagId = await this.hashTagsRepository.findOne({
          select: ['id'],
          where: { keyword },
        });
        let hashtagPost: HashTag;

        // 해시태그가 없을 경우에만 추가
        if (!hashtagId) {
          const insertResult = await this.hashTagsRepository
            .createQueryBuilder()
            .insert()
            .into(HashTag)
            .values({ keyword })
            .execute();

          hashtagId = insertResult.identifiers[0].id;
        } else {
          hashtagPost = await this.hashTagsRepository
            .createQueryBuilder('hash_tag')
            .leftJoinAndSelect('hash_tag.boards', 'boards')
            .where('hash_tag.id = :id', { id: hashtagId.id })
            .andWhere('boards.id =:id ', { id: boardId })
            .getRawOne();
        }
        // 해시태그 id + 게시글 id 중복일 때
        if (!hashtagPost) {
          await this.hashTagsRepository
            .createQueryBuilder()
            .insert()
            .into('hashtag_board')
            .values({ hash_tag_id: hashtagId, board_id: boardId })
            .execute();
        }
      }
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async updateBoard(id: number, updateBoardDto: UpdateBoardDto, user) {
    const board = await this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.user', 'user')
      .update(Board)
      .set({ ...updateBoardDto })
      .where('board.id = :id', { id })
      .andWhere('user.id = :id', { id: user.sub })
      .execute();

    if (!board.affected)
      throw new ForbiddenException('없는 게시물이거나 권한이 없습니다.');

    return board;
  }

  async deleteBoard(id: number, user) {
    const board = await this.boardRepository.findOne({
      where: { id },
      withDeleted: true,
      relations: { user: true },
    });

    // 게시글 검증
    if (!board) throw new HttpException('찾을 수 없는 게시글입니다.', 404);

    // 사용자 검증
    if (board.user.id !== user.sub)
      throw new HttpException(
        '게시글 작성자만 게시글을 삭제할 수 있습니다.',
        403,
      );

    // 이미 삭제된 게시물이라면 복구
    if (board.deleteAt) await this.boardRepository.restore({ id });
    // 아니면 softDelete
    else await this.boardRepository.softDelete({ id });
  }

  async getBoardDetail(id: number) {
    const query = this.boardRepository
      .createQueryBuilder('board')
      .where('board.id = :id', { id });

    // 조회수 증가
    await query
      .update()
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

    const like = (
      await query
        .leftJoinAndSelect('board.love', 'love')
        .select(['love.user.id as userId'])
        .getRawMany()
    ).filter((el) => el.userId);

    const hashTag = await query
      .leftJoinAndSelect('board.hashtags', 'hashtags')
      .select(['hashtags.id', 'hashtags.keyword'])
      .getRawMany();

    return { board, like, hashTag };
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
