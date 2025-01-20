"use client";
import { useToast } from "@/components/toast/ToastProvider";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import FormCard from "./FormCard";

const SavedFormPage = ({ success, forms  = []}) => {
  const { addToast } = useToast();
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
      <div className="w-full h-screen text-center flex flex-col items-center justify-center gap-1 text-sm">
        <p>You have no saved forms </p>
      </div>
    );
  }
  return <div className="flex flex-wrap gap-4">
    {
      forms.map(form => (<FormCard key = {form?._id} {...form}/>))
    }
  </div>;
};

export default SavedFormPage;
