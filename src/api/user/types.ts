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
export type Session = {
  sessionId: string;
  deviceFingerprint: string;
  deviceIp: string;
};

export type SessionsResponse = ErrorCodeResponse & {
  data: Session[];
};

export type Limits = {
  funds: number;
  currentCountStockPacks: number;
  maxCountStockPacks: number;
  subscriptionName: string;
  currentPeriodEnd: string;
  activeSubscription: boolean;
};

export type LimitationsResponse = ErrorCodeResponse & {
  data: Limits;
};

export type Transaction = {
  transactionId: string;
  value: number;
  fee: number;
  explanationKey: string;
  createdAt: string;
};

export type TransactionsResponse = ErrorCodeResponse & {
  data: Transaction[];
  total: number;
};

export type TopUpResponse = ErrorCodeResponse & {
  data: string;
  total: number;
};
