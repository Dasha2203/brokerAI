import Button from "@/components/buttons/Button";
import Input from "@/components/Input";
import React from "react";

const RegisterForm = () => {
  return (
    <div className="mx-auto p-6 md:p-12 md:max-w-[512px] w-full bg-violet-200 dark:bg-violet-500 rounded-xl">
      <h1 className="mb-10 font-bold text-3xl md:text-4xl text-center ">Sign up</h1>
      <form className="flex flex-col gap-5">
        <Input
          label="First Name"
          placeholder="First Name"
          className="w-full"
        />
        <Input
          label="First Name"
          placeholder="First Name"
          className="w-full"
        />
       
        <Button
          as="button"
          uiColor="primary"
          variant="contained"
          fixedSize
          className="w-full"
        >
          Sign up
        </Button>
        <div className="mt-6">
          <span>
            Already have an account?
          </span>
        </div>
      </form>
    </div>
  )
};

export default RegisterForm;
