import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /*
  return {}
  
  @Post('signup')
  singup(){
    TODO:조건 1
    
    TODO:조건 2
  }
  */

  /* 
  return {}
  @Post('login')
  login(){
TODO: 이메일 비밀번호로 사용자 인증

TODO: JWT토큰 발급
  }
  */
}
