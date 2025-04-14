import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './res/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        retryAttempts: 10, // 연결에 실패했을 경우, 연결 재시도 횟수를 의미합니다.
        type: 'mysql', // 어떤 DB를 사용할 것인지
        host: 'localhost', // 우리는 본인 컴퓨터에 설치된 DB를 사용할 것이디 localhost로 설정
        port: 3306, // MySQL의 기본 포트는 3306 입니다.
        database: 'study', // 위에서 만든 study 데이터베이스로 설정
        username: 'root', // 설정한 username입력, 기본은 root
        password: '1q2w3e4r!', // 설정한 password입력
        entities: [path.join(__dirname, '/entities/**/*.entity.{js, ts}')],
        synchronize: false, // 무조건 false로 해두세요.
        logging: true, // typeorm 쿼리 실행시, MySQL의 쿼리문을 터미널에 보여줍니다.
        timezone: 'local',
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
