import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    // TODO: validate Email

    // TODO: 비밀번호 암호화

    // TODO: 유저 등록

    // return : { success: true }
    return '';
  }
}
