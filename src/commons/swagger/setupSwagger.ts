import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Farmfarm')
    .setDescription('팜팜 API 입니다.')
    .setVersion('1.0')
    // .addTag('Farmfarm')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 'api' 대신에 다른거 적으면 그 주소로 가짐
}
