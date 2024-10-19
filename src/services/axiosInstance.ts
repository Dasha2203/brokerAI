import axios from 'axios';

const axiosClient = (token: string | null = null) => {
  // const headers = token
  //   ? {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "multipart/form-data",
  //     }
  //   : {
  //       "Content-Type": "multipart/form-data",
  //     };

  const client = axios.create({
    baseURL: 'http://195.133.197.163:5000/api/',
  });

  return client;
};

export default axiosClient;
