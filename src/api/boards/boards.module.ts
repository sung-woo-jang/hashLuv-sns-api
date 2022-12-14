import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Love } from './entities/love.entity';
import { HashTag } from './entities/hashTag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, Love, HashTag]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [BoardsController],
  providers: [BoardsService, JwtService],
})
export class BoardsModule {}
