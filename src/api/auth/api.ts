import { RegistrationCredentials, RegistrationResponse } from './types';
import axiosClient from '@/services/axiosInstance';

const axios = axiosClient();

export const register = async (data: RegistrationCredentials) => {
  try {
    const response = await axios.post<RegistrationResponse>('/user/sign-up', data);

    return response.data;
  } catch (err: any) {
    throw err?.response?.data;
  }
};
