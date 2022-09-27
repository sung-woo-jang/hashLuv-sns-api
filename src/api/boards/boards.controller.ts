import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ValidationTakePipe } from './../../common/pipe/validationTake.pipe';
import { ValidationPagePipe } from './../../common/pipe/validationPage.pipe';
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
    @GetUser() user,
  ) {
    return this.boardsService.updateBoard(id, updateBoardDto, user);
  }

  // 게시글 삭제
  @UseGuards(JWTAuthGuard)
  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.boardsService.deleteBoard(id, user);
  }

  // 게시글 상세보기
  @Get('/:id')
  getBoardDetail(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.getBoardDetail(id);
  }

  // 좋아요
  @Post('/like/:id')
  @UseGuards(JWTAuthGuard)
  like(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.boardsService.like(id, user);
  }

  // Role Free
  // 게시글 리스트 가져오기

  @Get()
  getBoardList(
    @Query('sort') sort,
    @Query('search') search,
    @Query('filter') filter,
    @Query('take', ValidationTakePipe) take,
    @Query('page', ValidationPagePipe) page,
  ) {
    return this.boardsService.getBoardList({
      sort,
      search,
      filter,
      take,
      page,
    });
  }
}
