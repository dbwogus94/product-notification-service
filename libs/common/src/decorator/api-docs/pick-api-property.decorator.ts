import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Equals } from 'class-validator';

/**
 * PickApiProperty는 입력받은 defaultValue를 사용하여 2가지 일을 수행한다.
 * 1. ApiProperty 부여 - defaultValue를 enum 옵션에 매핑(사용하는 측에서 typescript uion 타입으로 사용하도록 만든다.)
 * 2. Equals 부여 - defaultValue를 Equals에 전달
 * @param defaultValue
 * @returns
 */
export function PickApiProperty(defaultValue: string) {
  return applyDecorators(
    ApiProperty({
      description: `type: ${defaultValue}`,
      default: defaultValue,
      enum: [defaultValue],
    }),
    Equals(defaultValue),
  );
}
