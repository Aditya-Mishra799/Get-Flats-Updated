"use server";

import authOptions from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import connectToDB from "@/lib/mongodb";
import FormData from "@/models/formData";
import { getServerSession } from "next-auth";

export const getSavedForms = async () => {
  try {
    const { user } = await getServerSession(authOptions);
    if (!user || !user?.id) {
      return {
        success: false,
        message: "Unauthorized, login and try again",
        error: error.message,
        data: {},
      };
    }
    await connectToDB();
    const forms = await FormData.find(
      { userId: user.id, isSubmitted: false },
      { title: 1, createdAt: 1, expiresAt: 1 }
    )
      .lean().exec()
      const formsWithStringIds = forms.map(form => ({
        ...form,
        _id: form._id.toString(), 
      }));
    return {
      success: true,
      message: "Saved forms found",
      error: null,
      data: { forms: formsWithStringIds },
    };
  } catch (error) {
    return {
      success: false,
      message: "Unauthorized, login and try again",
      error: error.message,
      data: {},
    };
  }
};
