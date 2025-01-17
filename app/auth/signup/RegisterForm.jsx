"use client";
import Button from "@/components/Button";
import Step from "@/components/form/Step";
import { RegisterFormValidationSchema } from "@/FormValidationSchema/RegisterUser";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RegisterFormInputs } from "../formInput";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const methods = useForm({
    mode: "onBlur",
    resolver: zodResolver(RegisterFormValidationSchema),
  });
  const router = useRouter();
  const signUpUser = async (data) => {
    try {
      const response = await axios.post("/api/auth/signup", data);
      router.push("/auth/signin");
    } catch (error) {
      console.error(error);
    }
  };
  const handleFormSubmit = async (data) => {
    await signUpUser(data);
  };
  return (
    <div className="bg-white px-6 py-8 rounded-md shadow-lg  max-w-[350px] md:max-w-[400px] lg:max-w-[420px] lg:px-12 lg:py-12">
      <h1 className="text-center font-base text-2xl tracking-wider mb-2">
        Sign Up
      </h1>
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4"
          onSubmit={methods.handleSubmit(handleFormSubmit)}
        >
          <Step fields={RegisterFormInputs} />
          <Button type="submit" className="mt-4 mx-2">
            Submit
          </Button>
          <p className="text-sm text-slate-600 text-center ">
            Already an user?{" "}
            <Link
              href={"/auth/signin"}
              className="underline font-base tracking-wide hover:text-slate-700"
            >
              <strong>Login</strong>
            </Link>{" "}
            here
          </p>
        </form>
      </FormProvider>
    </div>
  );
};

export default RegisterForm;
