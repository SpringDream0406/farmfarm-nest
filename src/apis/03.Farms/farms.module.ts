import { Module } from '@nestjs/common';
import { FarmsController } from './farms.controller';
import { FarmsService } from './farms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farm } from './entities/farm.entity';
import { KakaoApiService } from 'src/services/kakaoApi.service';
import { Farm_Application } from '../04.Farm_applications/entities/farm_application.entity';
import { Farm_ApplicationsService } from '../04.Farm_applications/farm_applications.service';

@Module({
  imports: [TypeOrmModule.forFeature([Farm, Farm_Application])],
  controllers: [FarmsController],
  providers: [FarmsService, Farm_ApplicationsService, KakaoApiService],
})
export class FarmsModule {}
