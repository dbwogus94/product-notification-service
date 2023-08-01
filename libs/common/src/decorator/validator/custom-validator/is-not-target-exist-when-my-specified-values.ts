import {
  buildMessage,
  ValidateBy,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

import { Util } from '../../../util';

/**
 * 입력받은 값이 specifiedValues와 같다면, targetKeys이 존재하지 않는지 검증한다.
 * - 입력받은 값이 specifiedValues와 같고, targetKeys이 존재할 때 에러 발생
 * - 이외의 경우 통과
 * @param specifiedValues
 * @param targetKeys
 * @param validationOptions
 * @returns
 */
export function IsNotTargetExistWhenSpecifiedValues<T>(
  specifiedValues: string,
  targetKeys: keyof T,
  validationOptions?: ValidationOptions,
): PropertyDecorator;
export function IsNotTargetExistWhenSpecifiedValues<T>(
  specifiedValues: string[],
  targetKeys: keyof T,
  validationOptions?: ValidationOptions,
): PropertyDecorator;
export function IsNotTargetExistWhenSpecifiedValues<T>(
  specifiedValues: string,
  targetKeys: (keyof T)[],
  validationOptions?: ValidationOptions,
): PropertyDecorator;
export function IsNotTargetExistWhenSpecifiedValues<T>(
  specifiedValues: string[],
  targetKeys: (keyof T)[],
  validationOptions?: ValidationOptions,
): PropertyDecorator;

export function IsNotTargetExistWhenSpecifiedValues<T>(
  specifiedValues: string | string[],
  targetKeys: keyof T | (keyof T)[],
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: 'IsNotTargetExistWhenSpecifiedValues',
      validator: {
        validate,
        defaultMessage: buildMessage(buildMessageFn, validationOptions),
      },
    },
    validationOptions,
  );

  function validate(propertyValue: any, args: ValidationArguments): boolean {
    // 조기종료 1: 값이 없으면 검증 없이 패스한다.
    if (Util.isNull(propertyValue)) {
      return true;
    }
    const instance = args.object as T;

    const isIncludeSpecifiedValues = (propertyValue: any) =>
      Array.isArray(specifiedValues)
        ? specifiedValues.includes(propertyValue)
        : specifiedValues === propertyValue;

    // 조기종료 2: specifiedValues가 일치하지 않는다면 검증 없이 패스한다.
    if (!isIncludeSpecifiedValues(propertyValue)) {
      return true;
    }

    // targetKeys에 대응하는 값이 isNull 인 경우만 true
    const isNotExistTargetValue = (targetKey: string) => {
      const result = Util.isNull(instance[targetKey]);
      return result;
    };

    return Array.isArray(targetKeys)
      ? targetKeys.every((targetKey) =>
          isNotExistTargetValue(targetKey as string),
        )
      : isNotExistTargetValue(targetKeys as string);
  }

  function buildMessageFn(eachPrefix: any, args: any) {
    const keys = Array.isArray(targetKeys)
      ? targetKeys.join(', ')
      : (targetKeys as string);
    const values = Array.isArray(specifiedValues)
      ? specifiedValues.join(', ')
      : (specifiedValues as string);
    return `[ ${keys} ] need not exist when ${args.property}'s value is [ ${values} ]`;
  }
}
