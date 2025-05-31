import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { User } from 'src/apis/02.Users/entities/users.entity';

class CheckUserInputFromUser extends PickType(User, ['user_email', 'user_nick']) {
  @ApiProperty({ uniqueItems: true, maxLength: 20, example: 'TomatoKing' })
  @IsNotEmpty({ message: '아이디를 입력하세요' })
  @IsString({ message: '아이디는 string 타입이어야 합니다' })
  @MaxLength(20, { message: '아이디는 최대 20까지 입력할 수 있습니다' })
  user_id: string;
}

// class CheckUserInput_1 extends PickType(Auth, ['user_id']) {
//   user: CheckUserInputFromUser;
// }

export class CheckUserInput extends PartialType(CheckUserInputFromUser) {}

export class CreateUserInput extends OmitType(User, ['id', 'createdAt', 'user_type']) {
  @ApiProperty({ uniqueItems: true, maxLength: 20, example: 'TomatoKing' })
  @IsNotEmpty({ message: '아이디를 입력해주세요' })
  @IsString({ message: '아이디는 string 타입이어야 합니다' })
  @MaxLength(20, { message: '아이디는 최대 20까지 입력할 수 있습니다' })
  user_id: string;

  @ApiProperty({ example: 'farmfarm1234' })
  @IsNotEmpty({ message: '비밀번호를 입력해주세요' })
  @IsString({ message: '비밀번호는 string 타입이어야 합니다' })
  user_pw: string;

  @ApiProperty({
    required: false,
    uniqueItems: true,
    description: '정보 수정할 때, uid',
    example: '49b3bd13-0a49-4f97-9b79-733bb0a709da',
  })
  @IsOptional()
  id?: string;

  @ApiProperty({ required: false, description: '정보 수정할 때' })
  @IsOptional()
  user_type?: number; // 정보 수정할 때
}

export class LoginInput {
  @ApiProperty({
    description: 'user_id || uid',
    example: 'TomatoKing || 49b3bd13-0a49-4f97-9b79-733bb0a709da',
  })
  @IsNotEmpty({ message: '아이디를 입력하세요' })
  // 들어올 타입이 2개라 길이 제약을 못거네..
  user_id: string;

  @ApiProperty({ example: 'farmfarm1234' })
  @IsNotEmpty({ message: '비밀번호를 입력하세요' })
  @IsString({ message: '비밀번호는 string 타입이어야 합니다' })
  user_pw: string;
}
