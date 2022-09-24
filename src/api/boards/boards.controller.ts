import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator/user.decorator';
import { JWTAuthGuard } from '../auth/guard/jwt.auth.guard';
import { User } from '../users/entities/user.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update.board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  // 게시글 생성
  @UseGuards(JWTAuthGuard)
  @Post()
  // 제목, 내용, 해시태그
  createBoard(@Body() createBoardDto: CreateBoardDto, @GetUser() user: User) {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  // 게시글 수정
  @UseGuards(JWTAuthGuard)
  @Patch('/:id')
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.updateBoard(id, updateBoardDto);
  }

  // 게시글 삭제
  @UseGuards(JWTAuthGuard)
  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number) {
    // TODO: 게시글 SoftDelete
    return this.boardsService.deleteBoard(id);
  }

  /* 
  하나로 합치는 쪽으로 구현
  
  삭제된 게시글 복구
  @UseGuard(JWTGuard)
  @Post('/:id')
  restorationBoard(@Body() 제목, 내용, 해시태그){
    TODO: Body내용 원본이랑 교체
  }
  */

  /* 
  게시글 상세보기
  @Get("/:id")
  getBoardDetail(){
    Role Free

    TODO: 게시글 상세보기 호출 시 조회수 증가

    return { 제목, 내용, 해시태그, 좋아요 수, 조회수, 작성일(시간까지), 작성자 }
  }

  TODO: 좋아요 기능 따로 구현
  */

  /* 
  게시글 리스트 가져오기
  @Query(sort: 정렬)
  @Query(search: 제목 키워드)
  @Query(filter: 해시태그 키워드)
  @Query(pagination: 페이지)
  @Get()
  getBoardList(){
    Role Free

    return {제목, 작성자, 해시태그, 작성(년 / 월 / 일), 좋아요 수, 조회수}
  }
  */
}
