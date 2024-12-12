'use client';
import Title from '@/components/Title';
import Box from '@/components/ui/Box';
import PageContainer from '@/components/ui/PageContainer';
import useAuth from '@/hooks/useAuth';
import UserInfo from './components/UserInfo';
import { useEffect, useState } from 'react';
import { BillinInfo, getBillingInfo } from '@/api/user';
import Sessions from './components/Sessions';
import ActionsPanel from './components/ActionsPanel';
import Limitations from './components/Limitations';
import ChatBot from '@/components/ChatBot';

const Profile = () => {
  const user = useAuth();
  const [billingInfo, setBillingInfo] = useState<BillinInfo | null>(null);

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
      <div className="grid grid-cols-[2fr_1fr] gap-8">
        <UserInfo user={user} billingInfo={billingInfo} />
        <Limitations />
      </div>
      <div className="mt-8 grid grid-cols-[1fr_2fr] gap-8">
        <Sessions />
        <ActionsPanel user={user} billingInfo={billingInfo} />
      </div>
      <ChatBot />
    </PageContainer>
  );
};

export default Profile;
