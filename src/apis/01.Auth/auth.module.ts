import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../02.Users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../02.Users/entities/users.entity';
import { Auth } from './entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auth, User])],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
