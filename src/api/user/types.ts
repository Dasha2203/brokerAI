import { IUser } from '@/models/IUser';

export type ErrorCodeResponse = {
  errorCode: string;
};

export type UserInfoResponse = ErrorCodeResponse & {
  data: IUser;
};

export type BillinInfo = {
  customerSessionSecret: string;
  customerPortalUrl: string;
  expressPortalUrl: string;
  expressOnboardingCompleted: boolean;
};

export type BillingInfoResponse = ErrorCodeResponse & {
  data: BillinInfo;
};
