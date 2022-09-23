import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;
    // 이메일 중복 검사
    if (await this.userRepository.findOne({ where: { email } }))
      throw new ConflictException(
        `이미 가입한 이메일입니다. 다른 계정으로 회원가입 해주세요.`,
      );

    // 비밀번호 암호화
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 유저 등록
    const user = await this.userRepository
      .createQueryBuilder('user')
      .insert()
      .into(User)
      .values({ email, name, password: hashedPassword })
      .execute();

    if (!user) throw new InternalServerErrorException();
  }
}
