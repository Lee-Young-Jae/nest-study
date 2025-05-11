import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './res/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './res/article/article.module';
import { CommentModule } from './res/comment/comment.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { UndefinedToNullInterceptor } from './interceptors/undefinedToNull.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';

console.log(`.env.${process.env.NODE_ENV}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        retryAttempts: 10, // 연결에 실패했을 경우, 연결 재시도 횟수를 의미합니다.
        type: 'mysql', // 어떤 DB를 사용할 것인지
        host: configService.get('DB_HOST'), // 우리는 본인 컴퓨터에 설치된 DB를 사용할 것이디 localhost로 설정
        port: configService.get('DB_PORT') || 3306, // MySQL의 기본 포트는 3306 입니다.
        database: configService.get('DB_NAME'), // 위에서 만든 study 데이터베이스로 설정
        username: configService.get('DB_USER'), // 설정한 username입력, 기본은 root
        password: configService.get('DB_PASSWORD'), // 설정한 password입력
        entities: [path.join(__dirname, '/entities/**/*.entity.{js, ts}')],
        synchronize: false, // 무조건 false로 해두세요
        logging: true, // typeorm 쿼리 실행시, MySQL의 쿼리문을 터미널에 보여줍니다.
        timezone: 'local',
      }),
    }),
    UserModule,
    AuthModule,
    ArticleModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR, // 글로벌 인터셉터
      useClass: UndefinedToNullInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
