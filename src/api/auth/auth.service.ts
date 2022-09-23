import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginUserRequestDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(loginUserRequestDto: LoginUserRequestDto): Promise<any> {
    const { email, password } = loginUserRequestDto;
    // validate Email
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else throw new UnauthorizedException('비밀번호가 틀립니다.');
  }
}
