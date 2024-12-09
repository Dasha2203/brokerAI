import authAxios, { axiosClient } from '@/services/axiosInstance';
import {
  BillingInfoResponse,
  SessionsResponse,
  UserInfoResponse,
} from './types';

export const getUserInfo = async () => {
  try {
    const response = await authAxios.get<UserInfoResponse>('/user');

    return response.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getBillingInfo = async () => {
  try {
    const response =
      await authAxios.get<BillingInfoResponse>('/user/billing/info');
    console.log(response);

    return response.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const getSessions = async () => {
  try {
    const response = await authAxios.get<SessionsResponse>(
      '/auth/session?Limit=5&Offset=0',
    );

    return response.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const removeSession = async ({ sessionId }: { sessionId: string }) => {
  try {
    await authAxios.delete<SessionsResponse>(
      `/auth/session?sessionId=${sessionId}`,
    );

    return true;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
