import { ko } from 'date-fns/locale';
import * as Fns from 'date-fns';

interface DateUtil {
  toFormat(date?: Date, format?: string): string;
  /**
   * 입력받은 date의 시, 분, 초, ms를 최대로 변경한다.
   * ex)
   * - input 2023-01-01 13:24:20.123
   * - output 2023-01-01 23:59:59.999
   * @param date
   * @returns
   */
  toEndOfDay(date?: Date): Date;

  /**
   * 입력받은 date의 시, 분, 초, ms를 최소로 변경한다.
   * ex)
   * - input 2023-01-01 13:24:20.123
   * - output 2023-01-01 00:00:00.000
   * @param date
   * @returns
   */
  toStartOfDay(date?: Date): Date;

  getMonth(date?: Date): number;

  getDays(date?: Date): number;

  isValidDate(target: number | string | Date): boolean;

  /**
   * Date로 파싱이 불가능하면 null을 리턴한다.
   * @param dateString
   */
  parseDate(dateString: any): Date | null;
}

export const DateUtil: DateUtil = {
  toFormat: (
    date: Date = new Date(),
    format = 'yyyy-MM-dd HH:mm:ss.SSS',
  ): string => {
    return Fns.format(date, format, {
      locale: ko,
    });
  },

  toEndOfDay(date: Date = new Date()): Date {
    return Fns.endOfDay(date);
  },

  toStartOfDay(date: Date = new Date()): Date {
    return Fns.startOfDay(date);
  },

  getMonth(date?: Date): number {
    return Fns.getMonth(date ?? new Date());
  },

  getDays(date?: Date): number {
    return Fns.getDate(date ?? new Date());
  },

  isValidDate(target: number | string | Date): boolean {
    const date = Fns.isDate(target) ? (target as Date) : new Date(target);
    return !isNaN(date.getTime());
  },

  parseDate(dateString: Date | string | number): Date {
    const date = new Date(dateString);
    return this.isValidDate(date) ? date : null;
  },
};
