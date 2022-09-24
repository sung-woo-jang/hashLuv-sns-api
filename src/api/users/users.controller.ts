import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserRequestDto } from './dto/login-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  /* 
  return {}
  @Post('login')
  login(){
TODO: 이메일 비밀번호로 사용자 인증

TODO: JWT토큰 발급
  }
  */
  @Post('login')
  login(@Body() loginUserRequestDto: LoginUserRequestDto) {
    return this.authService.validateUser(loginUserRequestDto);
  }
}
