import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserInfo } from '@/api/auth';
import { IUser } from '@/models/IUser';

const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  async function fetchUser() {
    try {
      const { data } = await getUserInfo();
      if (!data) {
        router.push('/auth/login');
      }
      setUser(data);
    } catch (err) {
      setUser(null);
      router.push('/auth/login');
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      router.push('/auth/login');
      return;
    }

    fetchUser();
  }, []);

  return user;
};

export default useAuth;
