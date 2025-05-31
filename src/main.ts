import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { setupSwagger } from "./commons/swagger/setupSwagger";
// import { HttpExceptionFilter } from './commons/filter/http-exception.filter';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('/app/ssl/key.key'),
    cert: fs.readFileSync('/app/ssl/cert.crt'),
  };
  
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();

  setupSwagger(app);

  await app.listen(3333);
}
bootstrap();
