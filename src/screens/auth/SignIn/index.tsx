import LoginForm from '@/components/forms/LoginForm';
import PageContainer from '@/components/ui/PageContainer';

const SignUp = () => {
  return (
    <PageContainer className="py-3 md:py-7 min-h-full-screen flex flex-col justify-center">
      <div className=" h-full">
        <div className="mx-auto p-6 md:p-12 md:max-w-[512px] w-full bg-white dark:bg-violet-500 rounded-xl">
          <h1 className="mb-10 font-bold text-3xl md:text-4xl text-center ">
            Sign in
          </h1>
          <LoginForm />
        </div>
      </div>
    </PageContainer>
  );
};

export default SignUp;
