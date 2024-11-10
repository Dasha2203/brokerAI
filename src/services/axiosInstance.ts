import { RefreshResponse } from '@/api/auth';
import axios from 'axios';

const baseURL = 'http://213.148.11.27:5000/api/';

export const axiosClient = axios.create({
  baseURL,
});

const authAxios = axios.create({
  baseURL,
});

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const { data } = await axiosClient.post<RefreshResponse>('/auth/refresh', {
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
}

authAxios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    const accessTokenExpiration = localStorage.getItem('accessTokenExpiration');

    if (!accessTokenExpiration) return config;

    const accessTokenExpirationDate = new Date(accessTokenExpiration);
    const now = new Date();

    if (accessToken && now < accessTokenExpirationDate) {
      console.log(`access token: ` + accessToken)
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
      // Если accessToken истёк, обновляем его
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        config.headers['Authorization'] = `Bearer ${newAccessToken}`;
      }
    }
    console.log('interceptor request: ' + accessToken);
    console.log('headers: ' + config.headers);

    return config;
  },
  (error) => Promise.reject(error),
);

// Перехватчик ответов: обрабатывает ошибку 401 и пытается обновить токен
// authAxios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Проверяем, если ошибка 401 и это не повторный запрос на обновление токена
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       // Пробуем обновить токен
//       const newAccessToken = await refreshAccessToken();
//       if (newAccessToken) {
//         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//         return authAxios(originalRequest); // Повторяем запрос с новым токеном
//       }
//     }

//     return Promise.reject(error);
//   },
// );

export default authAxios;
