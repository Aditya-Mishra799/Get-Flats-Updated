"use client";
import Button from "@/components/Button";
import Step from "@/components/form/Step";
import Input from "@/components/Input";
import { RegisterFormValidationSchema } from "@/FormValidationSchema/RegisterUser";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

const inputFields = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    component: Input,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    component: Input,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    component: Input,
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "Password",
    component: Input,
  },
];
const page = () => {
  const methods = useForm({
    mode: "onBlur",
    resolver: zodResolver(RegisterFormValidationSchema),
  });
  const handleFormSubmit = async (data) => {
    methods.reset();
    console.log(data);
    await signIn("credentials", data);
  };
  return (
    <div>
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4"
          onSubmit={methods.handleSubmit(handleFormSubmit)}
        >
          <Step fields={inputFields} />
          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default page;
