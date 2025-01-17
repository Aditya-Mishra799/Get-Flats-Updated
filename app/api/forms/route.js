import ListingFormData from "@/models/listingsFormData";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); 

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const form = await ListingFormData.findById(id);
    if (!form) {
      return NextResponse.json({ error: "No form found with this ID" }, { status: 404 });
    }

    const page = searchParams.get('page');
    if (!page || !form[page]) {
      return NextResponse.json({ error: "Page data not found" }, { status: 404 });
    }

    // Return the specific page data
    return NextResponse.json({ data: form[page] }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
