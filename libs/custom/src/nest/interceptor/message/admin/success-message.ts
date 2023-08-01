const AuthServiceSuccessMessage = {};
const ProductServiceSuccessMessage = {};
const UserServiceSuccessMessage = {};

/**
 * S + statusCode + 컨트롤러 + 넘버링
 */
export const SuccessMessage = {
  S200APP001: '[ADMIN] 성공',
  ...AuthServiceSuccessMessage,
  ...ProductServiceSuccessMessage,
  ...UserServiceSuccessMessage,
};
