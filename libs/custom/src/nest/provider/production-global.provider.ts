import { HttpException } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RavenInterceptor } from 'nest-raven';

import {
  ResponseInterceptor,
  ServerErrorLoggingInterceptor,
  ServerErrorSendInterceptor,
} from '../interceptor';

/**
 * ### 운영서버에 사용할 전역 provider
 * 실행 순서
 * 1. ResponseInterceptor
 * 2. RavenInterceptor
 * 3. ServerErrorSendInterceptor
 * 4. ServerErrorLoggingInterceptor
 * 5. Controller(MVC)
 * 6. ServerErrorLoggingInterceptor
 * 7. ServerErrorSendInterceptor
 * 8. RavenInterceptor
 * 9. ResponseInterceptor
 */
export const ProductionGlobalProviders = [
  /* HTTP에러 헨들링 인터셉터(최초, 최종 호출) */
  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
  },
  /* 서버에러 Sentry 전송용 인터셉터 */
  {
    provide: APP_INTERCEPTOR,
    useValue: new RavenInterceptor({
      filters: [
        {
          type: HttpException,
          filter: (exception: HttpException) => 500 > exception.getStatus(),
        },
      ],
    }),
  },
  /* 서버에러 슬렉 전송용 인터셉터 */
  {
    provide: APP_INTERCEPTOR,
    useClass: ServerErrorSendInterceptor,
  },
  /* 서버에러 로그 출력용 인터셉터 */
  {
    provide: APP_INTERCEPTOR,
    useClass: ServerErrorLoggingInterceptor,
  },
];
