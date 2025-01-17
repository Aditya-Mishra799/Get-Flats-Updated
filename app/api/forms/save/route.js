import ListingFormData from "@/models/listingsFormData";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.json();
    const { id, userId, page, data } = formData;

    if (!page) {
      return NextResponse.json({ error: "Invalid Inputs" }, { status: 400 });
    }

    if (id) {
      const form = await ListingFormData.findById(id);
      if (!form) { 
        return NextResponse.json({ error: "No such form found" }, { status: 404 });
      }

      form[page] = data;
      await form.save();
      return NextResponse.json({ message: "Form data updated successfully" }, { status: 200 }); // Status code 200 for successful update
    } else {
      const form = new ListingFormData();
      if (userId) {
        form.userId = userId;
      }

      form[page] = data;

      await form.save();
      
      return NextResponse.redirect(`/add-listing/${form._id}`); 
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
