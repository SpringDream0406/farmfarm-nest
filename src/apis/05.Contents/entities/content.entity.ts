import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/apis/02.Users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Content {
  @ApiProperty({ description: 'increment', example: 1 })
  @PrimaryGeneratedColumn('increment')
  @IsNotEmpty()
  content_num: number;

  @ApiProperty({ description: 'User 테이블의 user_nick과 결합' })
  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'user_nick' })
  user: User;

  @ApiProperty({ maxLength: 30, example: '저희 텃밭에 상추..' })
  @Column({ length: 30 })
  @IsNotEmpty({ message: '제목을 작성해주세요' })
  content_title: string;

  @ApiProperty({ example: '...' })
  @Column({ type: 'text' })
  @IsNotEmpty({ message: '내용을 작성해주세요' })
  contents: string;

  @ApiProperty({ description: '1~40 랜덤 값', example: '1' })
  @Column()
  content_img: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
