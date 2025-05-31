import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from '../02.Users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { DataSource, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import {
  IAuthServiceCheckInput,
  IAuthServiceCreate,
  IAuthServiceLogin,
} from './interfaces/auth-service.interface';
import { User } from '../02.Users/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {}

  findOneByUserId({ user_id }: { user_id: string }): Promise<Auth> {
    return this.authRepository.findOne({
      where: { user_id },
      relations: ['user'],
    });
  }

  findOneByUid({ user_id }: { user_id: string }): Promise<Auth> {
    return this.authRepository.findOne({
      where: {
        user: { id: user_id },
      },
      relations: ['user'],
    });
  }

  async hashPw({ user_pw }: { user_pw: string }): Promise<string> {
    const salt = Number(this.configService.get<string>('SALT'));
    return await bcrypt.hash(user_pw, salt);
  }

  async checkUser({ checkUserInput }: IAuthServiceCheckInput): Promise<string> {
    const { user_id, ...inputs } = checkUserInput;
    const authResult = await this.findOneByUserId({ user_id });
    if (user_id && authResult) throw new ConflictException('이미 등록된 아이디 입니다.');
    const userResult = await this.usersService.findOneByInputInUser({
      inputs,
    });
    if (userResult) {
      if (userResult.user_email === inputs.user_email)
        throw new ConflictException('이미 등록된 이메일 입니다.');
      if (userResult.user_nick === inputs.user_nick)
        throw new ConflictException('이미 등록된 닉네임 입니다.');
    }
    return '사용 가능';
  }

  async create({ createUserInput }: IAuthServiceCreate): Promise<User> {
    const { user_id, user_pw, id, ...userData } = createUserInput;
    const { user_email, user_nick } = userData;
    if (!id) {
      const checkUserInput = { user_id, user_email, user_nick };
      await this.checkUser({ checkUserInput });
    }
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await queryRunner.manager.save(
        User,
        id ? { id: id, ...userData } : userData,
      );
      const hashedPw = await this.hashPw({ user_pw });
      await queryRunner.manager.save(Auth, {
        user_id,
        user_pw: hashedPw,
        user,
      });
      await queryRunner.commitTransaction();
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('회원 가입 실패(DB)');
    } finally {
      queryRunner.release();
    }
  }

  async login({ loginInput }: IAuthServiceLogin): Promise<User | Auth> {
    const { user_id, user_pw } = loginInput;
    let auth: Auth;
    if (user_id.length === 36) {
      auth = await this.findOneByUid({ user_id });
    } else {
      auth = await this.findOneByUserId({ user_id });
      if (!auth) throw new BadRequestException('로그인 실패');
    }
    const isPwMath = await bcrypt.compare(user_pw, auth.user_pw);
    if (!auth || !isPwMath) throw new BadRequestException('로그인 실패');
    return user_id.length === 36 ? { ...auth, user_pw: '' } : auth.user;
  }
}
