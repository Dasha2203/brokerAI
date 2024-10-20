import LoginForm from '@/components/forms/LoginForm';
import LayoutContainer from '@/components/ui/LayoutContainer';

const SignUp = () => {
  return (
    <div className="flex flex-col justify-center min-h-full-screen">
      <LayoutContainer className="py-7">
        <div className="mx-auto p-6 md:p-12 md:max-w-[512px] w-full bg-white dark:bg-violet-500 rounded-xl">
          <h1 className="mb-10 font-bold text-3xl md:text-4xl text-center ">
            Sign in
          </h1>
          <LoginForm />
        </div>
      </LayoutContainer>
    </div>
  );
};

export default SignUp;
