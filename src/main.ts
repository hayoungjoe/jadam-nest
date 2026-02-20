import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //DTO에 없는 데이터는 자동으로 삭제
      forbidNonWhitelisted: true, //whitelist와 같이 사용했을때, 허용되지 않은 필드를 에러로 거부함. 삭제 대신 에러처리용
      transform: true, //요청 바디 값을 DTO 타입으로 변환해줌 ex.string -> number
    }),
  );
  app.enableShutdownHooks();
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new PrismaExceptionFilter());
  app.setGlobalPrefix('api');
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`${PORT}번 포트 연결 성공`);
}
bootstrap();
