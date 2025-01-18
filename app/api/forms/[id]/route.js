import connectToDB from "@/lib/mongodb";
import ListingFormData from "@/models/formData";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
  const  id =  (await params).id
  try {
    await connectToDB()
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const form = await ListingFormData.findById(id);
    if (!form) {
      return NextResponse.json({ error: "No form found with this ID" }, { status: 404 });
    }

    // Return the specific page data
    return NextResponse.json({ pageData: form.data, currentPage  : form.currentPage }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
