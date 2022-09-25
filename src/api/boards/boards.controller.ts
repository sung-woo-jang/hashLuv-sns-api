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
  Request,
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
    return this.boardsService.deleteBoard(id);
  }

  // 게시글 상세보기
  @Get('/:id')
  getBoardDetail(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.getBoardDetail(id);
  }

  // TODO: 좋아요 기능 따로 구현

  // Role Free
  // 게시글 리스트 가져오기
  @Get()
  getBoardList(@Request() req) {
    return this.boardsService.getBoardList(req);
  }
}
