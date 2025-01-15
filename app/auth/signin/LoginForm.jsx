"use client";
import Button from "@/components/Button";
import Step from "@/components/form/Step";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { LoginFormInputs, RegisterFormInputs } from "../formInput";
import { LoginFormValidationSchema } from "@/FormValidationSchema/LoginUser";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  console.log(router, callbackUrl)

  const methods = useForm({
    mode: "onBlur",
    resolver: zodResolver(LoginFormValidationSchema),
  });

  const handleFormSubmit = async (data) => {
    await signIn("credentials", { ...data, redirect: true, callbackUrl });
    methods.reset();
  };
  return (
    <div className="bg-white px-6 py-8 rounded-md shadow-lg  max-w-[350px] md:max-w-[400px] lg:max-w-[420px] lg:px-12 lg:py-12">
      <h1 className="text-center font-base text-2xl tracking-wider mb-2">
        Log In
      </h1>
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4"
          onSubmit={methods.handleSubmit(handleFormSubmit)}
        >
          <Step fields={LoginFormInputs} />
          <Button type="submit" className="mt-4 mx-2">
            Submit
          </Button>
          <p className="text-sm text-slate-600 text-center ">
            New user?{" "}
            <Link
              href={"/auth/signup"}
              className="underline font-base tracking-wide hover:text-slate-700"
            >
              <strong>Register</strong>
            </Link>{" "}
            here
          </p>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
