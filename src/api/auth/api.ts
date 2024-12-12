import authAxios, { axiosClient } from '@/services/axiosInstance';
import {
  AddOtpResponse,
  ChangePasswordCredentials,
  ConfirmOtpResponse,
  ErrorCodeResponse,
  LoginCredentials,
  LoginResponse,
  RegistrationCredentials,
  RegistrationResponse,
  ResetPasswordCredentials,
  UserInfoResponse,
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

export const getUserInfo = async () => {
  try {
    const response = await authAxios.get<UserInfoResponse>('/user');

    return response.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const addOtp = async () => {
  try {
    const response = await authAxios.post<AddOtpResponse>('/auth/add-otp');

    return response.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const confirmOtp = async ({ code }: { code: string }) => {
  try {
    const data = await authAxios.post<ConfirmOtpResponse>('/auth/confirm-otp', {
      code,
    });

    return data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const resetOtp = async (data: { email: string; resetKey: string }) => {
  try {
    const response = await authAxios.post<ConfirmOtpResponse>(
      '/auth/reset-otp',
      data,
    );

    return response;
  } catch (err: any) {
    throw err?.response?.data;
  }
};

export const removeOtp = async () => {
  try {
    const { data } =
      await authAxios.post<ErrorCodeResponse>('/auth/remove-otp');

    return data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
