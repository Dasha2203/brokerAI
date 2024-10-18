import RegisterForm from '@/components/forms/RegisterForm';
import LayoutContainer from '@/components/ui/LayoutContainer';

const SignUp = () => {
  return (
    <div className="flex flex-col justify-center min-h-full-screen">
      <LayoutContainer>
        <RegisterForm />
      </LayoutContainer>
    </div>
  );
};

export default SignUp;
