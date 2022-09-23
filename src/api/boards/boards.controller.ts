import { Controller } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  /* 
  게시글 생성
  @UseGuard(JWTGuard)
  @Post()
  createBoard(@Body() 제목, 내용, 해시태그){
    TODO: 사용자 정보는 req.user에서 추출

    TODO: function 해시태그 구분 함수
  }
  */

  /* 
  게시글 수정
  @UseGuard(JWTGuard)
  @Patch('/:id')
  updateBoard(@Body() 제목, 내용, 해시태그,@Param()){
    TODO: Body내용 원본이랑 교체
  }
  */

  /* 
  게시글 삭제
  @UseGuard(JWTGuard)
  @Delete('/:id')
  deleteBoard(@Body() 제목, 내용, 해시태그, @Param()){
    TODO: 게시글 SoftDelete
  }

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
