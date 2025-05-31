import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { User } from 'src/apis/02.Users/entities/users.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Auth {
  @ApiProperty({ maxLength: 20, example: 'TomatoKing' })
  @PrimaryColumn({ length: 20 })
  @IsNotEmpty({ message: '아이디를 입력하세요' })
  @IsString({ message: '아이디는 string 타입이어야 합니다' })
  @MaxLength(20, { message: '아이디는 최대 20까지 입력할 수 있습니다' })
  user_id: string;

  @Column({ length: 60 })
  @IsNotEmpty({ message: '비밀번호를 입력하세요' })
  @IsString({ message: '비밀번호는 string 타입이어야 합니다' })
  user_pw: string;

  @ApiProperty({ description: 'User 테이블 id와 결합' })
  @JoinColumn()
  @OneToOne(() => User)
  user: User;
}
