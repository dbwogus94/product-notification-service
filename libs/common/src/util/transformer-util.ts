import { TransformFnParams } from 'class-transformer';

interface TransformerUtil {
  /**
   * params.value가 존재하면 value.trim()하여 리턴
   * @param params TransformFnParams
   */
  trim(params: TransformFnParams): string | undefined;
  /**
   * params.value가 배열이 아니라면 배열로 만들어서 리턴
   * @param params TransformFnParams
   */
  toNumberArray(params: TransformFnParams): number[];

  /**
   * params.value가 배열이 아니라면 배열로 만들어서 리턴
   * - 배열인 경우: 모든 item을 trim() 후 리턴한다.
   * - 배열이 아닌 경우: item을 trim()하고 배열로 만들어서 리턴한다.
   * @param params TransformFnParams
   */
  toStringArray(params: TransformFnParams): string[];
}

export const TransformerUtil: TransformerUtil = {
  trim: ({ value }: TransformFnParams) => value && value.trim(),

  toNumberArray: ({ value }: TransformFnParams): number[] =>
    Array.isArray(value) ? value : [value],

  toStringArray: ({ value }: TransformFnParams): string[] =>
    Array.isArray(value) ? value.map((v: string) => v.trim()) : [value.trim()],
};
