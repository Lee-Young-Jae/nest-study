import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { UndefinedToNullInterceptor } from './interceptors/undefinedToNull.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('API 문서 제목')
    .setDescription('API 문서 설명')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  // app.useGlobalInterceptors(new UndefinedToNullInterceptor()); // 글로벌 인터셉터

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
