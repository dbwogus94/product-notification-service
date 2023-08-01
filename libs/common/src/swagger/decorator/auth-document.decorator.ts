import { applyDecorators } from '@nestjs/common';
import { ApiSecurity, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { TokenType } from '@app/common';

export const ApiAuthDocument = (tokenType: TokenType) => {
  return applyDecorators(
    ApiSecurity(tokenType),
    ApiUnauthorizedResponse({
      description: `401 Error Messages\n
      - '인증 정보가 잘못되었습니다.`,
    }),
  );
};
