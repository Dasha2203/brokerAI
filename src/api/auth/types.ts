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
  };
};

export type ResetPasswordCredentials = {
  email: string;
};

export type ChangePasswordCredentials = {
  password: string;
  code: string;
};
