import { RefreshResponse } from '@/api/auth';
import { default as axiosApi }  from 'axios';

const baseURL = 'http://213.148.11.27:5000/api/';

export const axios = axiosApi.create({
  baseURL,
});

const authRoutes = [
  '/user/sign-up',
  '/user/login',
  '/user/password/request-reset',
  '/user/password/reset',
  '/auth/refresh'
]

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const { data } = await axiosApi.post<RefreshResponse>('/auth/refresh', {
      refreshToken,
    });

    if (data.data && !data.errorCode) {
      const {
        accessToken,
        refreshToken,
        accessTokenExpiration,
        refreshTokenExpiration,
      } = data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem(
        'accessTokenExpiration',
        accessTokenExpiration.toString(),
      );
      localStorage.setItem(
        'refreshTokenExpiration',
        refreshTokenExpiration.toString(),
      );

      return accessToken;
    }
  } catch (error) {
    console.error('Error refreshing token', error);
    throw error;
  }
  return null;
  // return null;
}

axios.interceptors.request.use(
  async (config) => {
    const { url } = config
    const accessToken = localStorage.getItem('accessToken');
    const accessTokenExpiration = localStorage.getItem('accessTokenExpiration');

    if ((url && authRoutes.find(i => url.includes(i))) || !accessToken || !accessTokenExpiration) return config

    const nowDate = new Date()
    const accessTokenExpirationDate = new Date(accessTokenExpiration)

    if (accessToken && nowDate < accessTokenExpirationDate) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        config.headers['Authorization'] = `Bearer ${newAccessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Перехватчик ответов: обрабатывает ошибку 401 и пытается обновить токен
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Проверяем, если ошибка 401 и это не повторный запрос на обновление токена
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export default axios;
