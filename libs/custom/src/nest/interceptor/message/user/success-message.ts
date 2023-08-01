const AuthServiceSuccessMessage = {};
const ProductServiceSuccessMessage = {};
const UserServiceSuccessMessage = {};

export const SuccessMessage = {
  S200APP001: '[User] 성공',
  ...AuthServiceSuccessMessage,
  ...ProductServiceSuccessMessage,
  ...UserServiceSuccessMessage,
};
