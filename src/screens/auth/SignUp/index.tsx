import RegisterForm from '@/components/forms/RegisterForm';
import PageContainer from '@/components/ui/PageContainer';
import { useTranslations } from 'next-intl';

const SignUp = () => {
  const tSignUp = useTranslations('signUp');

  return (
    <PageContainer className="pb-7 min-h-full-screen">
      <div className="flex flex-col justify-center ">
        <div className="mx-auto p-6 md:p-12 md:max-w-[512px] w-full bg-white dark:bg-violet-500 rounded-xl">
          <h1 className="mb-10 font-bold text-3xl md:text-4xl text-center ">
            {tSignUp('title')}
          </h1>
          <RegisterForm />
        </div>
      </div>
    </PageContainer>
  );
};

export default SignUp;
