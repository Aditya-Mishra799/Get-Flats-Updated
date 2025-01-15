import connectToDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password, name } = await request.json();
  try {
    await connectToDB()
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Invalid Request Data" },
        { status: 400 }
      );
    }
    const alreadyExists = await  User.findOne({ email: email }).lean();
    if (alreadyExists) {
      return NextResponse.json(
        { error: "User with same email is already registered" },
        { status: 409 }
      );
    }
    const user  = new User({name, email, password})
    await user.save()
    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
