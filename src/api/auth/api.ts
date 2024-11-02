import {
  ErrorCodeResponse,
  RegistrationCredentials,
  RegistrationResponse,
  ResetPasswordCredentials,
} from './types';
import axiosClient from '@/services/axiosInstance';

const axios = axiosClient();

export const register = async (data: RegistrationCredentials) => {
  try {
    const response = await axios.post<RegistrationResponse>(
      '/user/sign-up',
      data,
    );

    return response.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const resetPassword = async (data: ResetPasswordCredentials) => {
  try {
    const response = await axios.post<ErrorCodeResponse>(
      '/user/password/request-reset',
      data,
    );

    return response.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
