import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Content } from '../../05.Contents/entities/content.entity';
import { User } from '../../02.Users/entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Content_Comment {
  @ApiProperty({ description: 'increment' })
  @PrimaryGeneratedColumn('increment')
  @IsNotEmpty()
  content_comment_num: number;

  @ApiProperty({ description: 'Content 테이블 content_num과 결합' })
  @ManyToOne(() => Content)
  content: Content;

  @ApiProperty({ description: 'User 테이블 id와 결합' })
  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'user_nick' })
  user: User;

  @ApiProperty({ maxLength: 150, example: '바로 삼겹살 사옵니다잉' })
  @Column({ length: 150 })
  @IsNotEmpty()
  content_comment: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
