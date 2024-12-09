import authAxios, { axiosClient } from '@/services/axiosInstance';
import { BillingInfoResponse, UserInfoResponse } from './types';

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
