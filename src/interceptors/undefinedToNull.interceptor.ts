import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    // controller 들어가기 전 부분의 동작은 이 위치에서 작성

    return (
      next
        .handle()
        // controller 실행되고 난 후는 handle() 메서드 이후, 체이닝 파이프라인 이후 작성
        // data의 경우 controller에서 반환해주는 데이터
        .pipe(map((data) => (data === undefined ? null : data)))
    );
  }
}
