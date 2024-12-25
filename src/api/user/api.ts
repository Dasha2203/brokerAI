import axios from '@/services/axiosInstance';
import {
  BillingInfoResponse,
  ErrorCodeResponse,
  LimitationsResponse,
  SessionsResponse,
  TopUpResponse,
  TransactionsResponse,
  UserInfoResponse,
} from './types';

export const getUserInfo = async () => {
  try {
    const response = await axios.get<UserInfoResponse>('/user');

    return response.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getBillingInfo = async () => {
  try {
    const response =
      await axios.get<BillingInfoResponse>('/user/billing/info');
    console.log(response);

    return response.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getSessions = async () => {
  try {
    const response = await axios.get<SessionsResponse>(
      '/auth/session?Limit=5&Offset=0',
    );

    return response.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const removeSession = async ({ sessionId }: { sessionId: string }) => {
  try {
    await axios.delete<SessionsResponse>(
      `/auth/session?sessionId=${sessionId}`,
    );

    return true;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getLimitations = async () => {
  try {
    const { data } =
      await axios.get<LimitationsResponse>('/user/limitations');

    return data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getMoneyTransactions = async ({
  Limit,
  Offset,
}: {
  Limit: number;
  Offset: number;
}) => {
  try {
    const { data } = await axios.get<TransactionsResponse>(
      `/money-transactions?Limit=${Limit}&Offset=${Offset}`,
    );

    return data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const payout = async ({ amount }: { amount: number }) => {
  try {
    const { data } = await axios.post('/user/billing/payout', {
      amount,
    });

    console.log('payout', data);
    return true;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const topUp = async ({ amount }: { amount: number }) => {
  try {
    const { data } = await axios.post<TopUpResponse>('/user/top-up', {
      amount,
    });

    return data.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const sendVerificationEmail = async () => {
  try {
    const { data } = await axios.post<ErrorCodeResponse>(
      '/user/email-send-verification');

    return data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
