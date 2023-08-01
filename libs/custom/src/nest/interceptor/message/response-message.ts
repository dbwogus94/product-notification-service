import { AdminErrorMessage, AdminSuccessMessage } from './admin';
import { UserSuccessMessage, UserErrorMessage } from './user';
import {
  NotificationSuccessMessage,
  NotificationErrorMessage,
} from './notification';

// S + statusCode + 컨트롤러 + 넘버링
export const successMessage = {
  ...UserSuccessMessage,
};

export const adminSuccessMessage = {
  ...AdminSuccessMessage,
};

export const notiSuccessMessage = {
  ...NotificationSuccessMessage,
};

// E + statusCode + 컨트롤러 + 넘버링, public = APP
export const errorMessage = {
  E400APP001: '요청이 유효성 검사를 통과하지 못하였습니다.',
  E404APP001: '요청한 자원이 존재하지 않거나 사용할 수 없습니다.',
  E401APP001: '인증 정보가 잘못되었습니다.',
  ...UserErrorMessage,
  ...AdminErrorMessage,
  ...NotificationErrorMessage,
};
