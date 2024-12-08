export interface IUser {
  userId: string;
  email: string;
  emailVerified: boolean;
  firstname: string;
  lastname: string;
  countryCode: string;
  languageCode: string;
  otpConnected: boolean;
}
