'use client';
import Title from '@/components/Title';
import Box from '@/components/ui/Box';
import PageContainer from '@/components/ui/PageContainer';
import useAuth from '@/hooks/useAuth';
import UserInfo from './components/UserInfo';
import { useEffect, useState } from 'react';
import { BillinInfo, getBillingInfo } from '@/api/user';

const Profile = () => {
  const user = useAuth();
  const [billingInfo, setBillingInfo] = useState<BillinInfo | null>();

  async function fetchBillingIfo() {
    try {
      const { data } = await getBillingInfo();
      setBillingInfo(data);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchBillingIfo();
  }, []);

  if (!user) return;

  return (
    <PageContainer>
      <UserInfo user={user} billingInfo={billingInfo} className="w-1/2" />
    </PageContainer>
  );
};

export default Profile;
