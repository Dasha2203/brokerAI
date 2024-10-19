export type RegistrationCredentials = {
  email: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  languageCode: string;
  password: string;
};

export type RegistrationResponse = {
  errorCode: string;
  data: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiration: Date;
    refreshTokenExpiration: Date;
  };
};
