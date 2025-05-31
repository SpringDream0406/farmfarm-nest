// import { Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min } from 'class-validator';
import { User } from 'src/apis/02.Users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Farm {
  @ApiProperty({ description: 'increment', example: 1 })
  @PrimaryGeneratedColumn('increment')
  @IsNotEmpty()
  farm_num: number;

  @ApiProperty({ maxLength: 50, example: '삼연주말농장' })
  @Column({ length: 50 })
  @IsNotEmpty({ message: '텃밭 이름을 입력하세요' })
  farm_title: string;

  @ApiProperty({ example: '광주광역시 광산구 XX동 XXX' })
  @Column()
  @IsNotEmpty({ message: '텃밭 주소를 입력하세요' })
  farm_address: string;

  @Min(1, { message: '면적(평)은 1 이상이어야 합니다' })
  @ApiProperty({ minimum: 1, example: 5 })
  @Column()
  @IsNotEmpty({ message: '면적(평)을 입력하세요' })
  lental_area: number;

  @Min(1, { message: '분양 개수는 1 이상이어야 합니다' })
  @ApiProperty({ minimum: 1, description: '분양 개수', example: 6 })
  @Column()
  @IsNotEmpty({ message: '분양 개수를 입력하세요' })
  farm_sector: number;

  @ApiProperty({ maxLength: 20, description: '텃밭유형', example: '소형' })
  @Column({ length: 20 })
  @IsNotEmpty({ message: '텃밭 유형을 선택하세요' })
  lental_type: string;

  @ApiProperty({ maxLength: 20, description: '운영주체', example: '개인' })
  @Column({ length: 20 })
  @IsNotEmpty({ message: '운영 주체를 선택하세요' })
  farm_type: string;

  @Min(1, { message: '분양희밍가는 1 이상이어야 합니다' })
  @ApiProperty({ minimum: 1, example: 120000 })
  @Column()
  @IsNotEmpty({ message: '분양희망가를 입력하세요' })
  farm_price: number;

  @ApiProperty({ description: '위도', example: 35.13253602 })
  @Column({ type: 'decimal', precision: 9, scale: 6 })
  lat: number;

  @ApiProperty({ description: '경도', example: 126.6866741 })
  @Column({ type: 'decimal', precision: 9, scale: 6 })
  lng: number;

  @ApiProperty({ example: '2024-05-01' })
  @Column({ type: 'date' })
  @IsNotEmpty({ message: '임대기간 시작일을 선택하세요' })
  lental_startDate: Date;

  @ApiProperty({ example: '2024-12-24' })
  @Column({ type: 'date' })
  @IsNotEmpty({ message: '임대기간 종료일을 선택하세요' })
  lental_endDate: Date;

  @ApiProperty({ example: '2024-04-24' })
  @Column({ type: 'date' })
  @IsNotEmpty({ message: '분양신청 시작일을 선택하세요' })
  startDate: Date;

  @ApiProperty({ example: '2024-04-30' })
  @Column({ type: 'date' })
  @IsNotEmpty({ message: '분양신청 마감일을 선택하세요' })
  endDate: Date;

  @ApiProperty({ example: '...' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: '1~40 랜덤 값', example: '1' })
  @Column()
  farm_img: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'User 테이블 id와 결합, 텃밭 분양자 정보' })
  @ManyToOne(() => User)
  user: User;
}
