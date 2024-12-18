import { IUser } from '@/models/IUser';

export type ErrorCodeResponse = {
  errorCode: string;
};

export type RegistrationCredentials = {
  email: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  languageCode: string;
  password: string;
};

export type RegistrationResponse = ErrorCodeResponse & {
  data: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiration: Date;
    refreshTokenExpiration: Date;
  } | null;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = ErrorCodeResponse & {
  data: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiration: Date;
    refreshTokenExpiration: Date;
  } | null;
};

export type ResetPasswordCredentials = {
  email: string;
};

export type ChangePasswordCredentials = {
  newPassword: string;
  code: string;
};

export type RefreshResponse = ErrorCodeResponse & {
  data: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiration: Date;
    refreshTokenExpiration: Date;
  };
};

export type UserInfoResponse = ErrorCodeResponse & {
  data: IUser;
};

export type AddOtpResponse = ErrorCodeResponse & {
  data: {
    otpUrl: string;
    otpResetKey: string;
  };
};

export type ConfirmOtpResponse = ErrorCodeResponse;
