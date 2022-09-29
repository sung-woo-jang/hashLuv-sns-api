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
import {
  ValidationOrderPipe,
  ValidationPagePipe,
  ValidationSortPipe,
  ValidationTakePipe,
} from './../../common/pipe';
import { GetUser } from '../auth/decorator/user.decorator';
import { JWTAuthGuard } from '../auth/guard/jwt.auth.guard';
import { User } from '../users/entities/user.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update.board.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BoardsAPIDocs } from './docs/boards.docs';

@ApiTags('게시판 API')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  // 게시글 생성
  @ApiBearerAuth('access_token')
  @ApiOperation(BoardsAPIDocs.createBoardOperation())
  @ApiUnauthorizedResponse(BoardsAPIDocs.UnauthorizedResponse())
  @ApiCreatedResponse(BoardsAPIDocs.createBoardCreatedResponse())
  @UseGuards(JWTAuthGuard)
  @Post()
  // 제목, 내용, 해시태그
  createBoard(@Body() createBoardDto: CreateBoardDto, @GetUser() user: User) {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  // 게시글 수정
  @ApiBearerAuth('access_token')
  @ApiOperation(BoardsAPIDocs.updateBoardOperation())
  @ApiUnauthorizedResponse(BoardsAPIDocs.UnauthorizedResponse())
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
  @ApiBearerAuth('access_token')
  @ApiOperation({ summary: 'Board Delete', description: '게시글 삭제' })
  @ApiUnauthorizedResponse(BoardsAPIDocs.UnauthorizedResponse())
  @ApiOkResponse({ type: Boolean, description: 'IsAffected' })
  @UseGuards(JWTAuthGuard)
  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.boardsService.deleteBoard(id, user);
  }

  // 게시글 상세보기
  @ApiOperation({ summary: '게시글 상세보기' })
  @ApiNoContentResponse()
  @ApiOkResponse({ type: CreateBoardDto })
  @Get('/:id')
  getBoardDetail(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.getBoardDetail(id);
  }

  // 좋아요
  @ApiBearerAuth('access_token')
  @ApiOperation({ summary: '게시글 좋아요' })
  @ApiUnauthorizedResponse(BoardsAPIDocs.UnauthorizedResponse())
  @ApiParam({ name: 'id', example: 1 })
  @Post('/like/:id')
  @UseGuards(JWTAuthGuard)
  like(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.boardsService.like(id, user);
  }

  // Role Free

  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'order', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiOperation({ summary: '게시글 리스트 가져오기 API' })
  @Get()
  getBoardList(
    @Query('sort', ValidationSortPipe) sort,
    @Query('order', ValidationOrderPipe) order,
    @Query('search') search,
    @Query('filter') filter,
    @Query('take', ValidationTakePipe) take,
    @Query('page', ValidationPagePipe) page,
  ) {
    return this.boardsService.getBoardList({
      sort,
      order,
      search,
      filter,
      take,
      page,
    });
  }
}
