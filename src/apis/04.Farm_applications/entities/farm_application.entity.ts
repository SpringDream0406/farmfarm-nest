import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Farm } from '../../03.Farms/entities/farm.entity';
import { User } from 'src/apis/02.Users/entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Farm_Application {
  @ApiProperty({ description: 'increment', example: 1 })
  @PrimaryGeneratedColumn('increment')
  @IsNotEmpty()
  application_num: number;

  @ApiProperty({ description: 'Farm 테이블 farm_num과 결합' })
  @ManyToOne(() => Farm)
  farm: Farm;

  @ApiProperty({ description: 'User 테이블의 id와 결합, 텃밭 신청자 정보' })
  @ManyToOne(() => User)
  user: User;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
