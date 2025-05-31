import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckUserInput, CreateUserInput, LoginInput } from './dto/auth-container.dto';
import { User } from '../02.Users/entities/users.entity';
import { Auth } from './entities/auth.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('회원 API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('check')
  @ApiOperation({ summary: '회원 데이터 중복 체크' })
  @ApiResponse({ status: 201, description: '사용가능', type: String })
  @ApiResponse({ status: 409, description: '중복 메시지', type: Error })
  checkUser(@Body() checkUserInput: CheckUserInput): Promise<string> {
    return this.authService.checkUser({ checkUserInput });
  }

  @Post('join')
  @ApiOperation({ summary: '회원가입 & 정보수정' })
  @ApiResponse({ status: 201, description: 'User 테이블 반환', type: User })
  @ApiResponse({ status: 400, description: '빈칸 존재', type: Error })
  @ApiResponse({ status: 500, description: '회원 가입 실패(DB)', type: Error })
  createUser(@Body() createUserInput: CreateUserInput): Promise<User> {
    return this.authService.create({ createUserInput });
  }

  @Post('login')
  @ApiOperation({ summary: '로그인 (회원 & 마이페이지)' })
  @ApiResponse({ status: 201, description: '일반 로그인은 User 테이블 없음', type: Auth })
  @ApiResponse({ status: 400, description: '로그인 실패 or 빈칸', type: Error })
  login(@Body() loginInput: LoginInput): Promise<Auth | User> {
    return this.authService.login({ loginInput });
  }
}
