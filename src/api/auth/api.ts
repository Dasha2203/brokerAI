import { axiosClient } from '@/services/axiosInstance';
import {
  ChangePasswordCredentials,
  ErrorCodeResponse,
  LoginCredentials,
  LoginResponse,
  RegistrationCredentials,
  RegistrationResponse,
  ResetPasswordCredentials,
} from './types';

export const register = async (data: RegistrationCredentials) => {
  try {
    const response = await axiosClient.post<RegistrationResponse>(
      '/user/sign-up',
      data,
    );

    return response.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const login = async (data: LoginCredentials) => {
  try {
    const response = await axiosClient.post<LoginResponse>('/user/login', data);
    return response.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const resetPassword = async (data: ResetPasswordCredentials) => {
  try {
    const response = await axiosClient.post<ErrorCodeResponse>(
      '/user/password/request-reset',
      data,
    );

    return response.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const changePassword = async (data: ChangePasswordCredentials) => {
  try {
    const response = await axiosClient.post<ErrorCodeResponse>(
      '/user/password/reset',
      data,
    );

    return response.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
