import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginUserRequestDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateAccessToken(user) {
    const payload = { username: user.name, sub: user.id };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      const access_token = await this.generateAccessToken(user);
      return { access_token };
    } else throw new UnauthorizedException('비밀번호가 틀립니다.');
  }

  async login(loginUserRequestDto: LoginUserRequestDto): Promise<any> {
    const { email, password } = loginUserRequestDto;
    const result = await this.validateUser(email, password);
    return result;
  }
}
