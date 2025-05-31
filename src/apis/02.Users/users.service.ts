import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IUsersServiceFindOneByInputInUser } from './interfaces/users-service.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * 회원가입 중복 체크용
   * @example 'user_email: test01'
   */
  findOneByInputInUser({ inputs }: IUsersServiceFindOneByInputInUser): Promise<User> {
    return this.usersRepository.findOne({
      // or 연산
      where: [{ user_email: inputs.user_email }, { user_nick: inputs.user_nick }],
    });
  }
}
