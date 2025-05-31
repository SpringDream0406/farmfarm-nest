import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmsModule } from './apis/03.Farms/farms.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './apis/01.Auth/auth.module';
import { ContentsModule } from './apis/05.Contents/contents.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    FarmsModule,
    ContentsModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true, // 각각의 entity 일일이 입력 or 자동
      synchronize: true, // 스키마 동기화
      logging: false, // 쿼리 실행 내역 터미널에 띄움
    }),
  ],
})
export class AppModule {}
