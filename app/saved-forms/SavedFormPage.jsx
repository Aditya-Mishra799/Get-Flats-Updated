"use client";
import { useToast } from "@/components/toast/ToastProvider";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import FormCard from "./FormCard";
import NotFound from "@/public/not-found.svg";
import Image from "next/image";

const SavedFormPage = ({ success, forms:initialForms  = []}) => {
  const [forms, setForms] = useState(initialForms)
  const { addToast } = useToast();
  const removeForm = (id) =>{
    setForms(prev => prev.filter(item => item?._id !== id))
  }
  useEffect(() => {
    if (!success) {
      addToast("error", "Please Login, to see saved forms");
    }
  }, []);
  if (!success) {
    return (
      <div className="w-full h-screen text-center flex flex-col items-center justify-center gap-1 text-sm">
        <p>Please Login, to see saved forms</p>
        <Link
          href={"/auth/siginin"}
          className="bg-slate-400 px-4 py-2 text-white rounded-md"
        >
          Login
        </Link>
      </div>
    );
  }
  if (Array.isArray(forms) && forms.length === 0) {
    return (
      <div className="w-full h-screen text-center flex flex-col  items-center justify-center gap-4  text-base text-gray-700 tracking-wider">
       <Image src = {NotFound} alt ="Not-found" width = {200} />
        <p>You have no saved forms </p>
      </div>
    );
  }
  return <div className="flex flex-wrap gap-4">
    {
      forms.map(form => (<FormCard key = {form?._id} {...form} onDelete = {removeForm}/>))
    }
  </div>;
};

export default SavedFormPage;
