import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from 'axios';

@Injectable()
export class BaseHttpService {
  constructor(private httpService: HttpService) {}

  public isClientError(status: number): boolean {
    return status && status >= 400 && status <= 499;
  }

  public isServerError(status: number): boolean {
    return status && status >= 500 && status <= 599;
  }

  public async get<T>(
    inputUrl: string,
    headers?: RawAxiosRequestHeaders,
    query?: Record<string, any>,
  ): Promise<AxiosResponse<T>> {
    const url = inputUrl + '?' + this.makeQuery(query);
    return this.send('get', url, {}, headers);
  }

  public async post<T>(
    inputUrl: string,
    body: any,
    headers?: RawAxiosRequestHeaders,
  ): Promise<AxiosResponse<T>> {
    return this.send('post', inputUrl, body, headers);
  }

  public async patch<T>(
    inputUrl: string,
    body: any,
    headers?: RawAxiosRequestHeaders,
  ): Promise<AxiosResponse<T>> {
    return this.send('patch', inputUrl, body, headers);
  }

  public async put<T>(
    inputUrl: string,
    body: any,
    headers?: RawAxiosRequestHeaders,
  ): Promise<AxiosResponse<T>> {
    return this.send('put', inputUrl, body, headers);
  }

  public async delete(
    inputUrl: string,
    headers?: RawAxiosRequestHeaders,
  ): Promise<void> {
    await this.send('delete', inputUrl, {}, headers);
  }

  public async send(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    inputUrl: string,
    body?: any,
    headers?: RawAxiosRequestHeaders,
    config?: Pick<AxiosRequestConfig, 'timeout'>,
  ): Promise<AxiosResponse> {
    try {
      const splitedUrl = inputUrl.split('?');
      const url =
        splitedUrl.length > 1
          ? encodeURI(splitedUrl[0]) + '?' + splitedUrl[1]
          : encodeURI(inputUrl);

      // TODO: this.httpService.axiosRef 외부에서 받고 defalut header 설정하는 방법으로 개선 예정
      const response = await this.httpService.axiosRef.request({
        method,
        url,
        data: body,
        headers: {
          ...headers,
        },
        ...config,
      });

      return response;
    } catch (error) {
      const { response, status, message } = error as AxiosError;
      if (this.isServerError(status)) {
        throw new InternalServerErrorException(message);
      }
      // 500 이외는 리턴
      return response;
    }
  }

  /**
   * URLSearchParams를 사용하여 인코딩된 URL Query String 생성하는 메서드
   *
   * - EX)
   * ```
   * const params1 = new URLSearchParams({ foo: 'bar', baz: 'qux' });
   * decodeURIComponent(params1.toString());
   * // => 'foo=bar&baz=qux'
   *
   * const params2 = new URLSearchParams({ foo: ['bar', 'bar2'], baz: 'qux' });
   * decodeURIComponent(params2.toString());
   * // => 'foo=bar,bar2&baz=qux'
   * ```
   */
  public makeQuery(object: Record<string, any>): string {
    return new URLSearchParams(object).toString();
  }
}
