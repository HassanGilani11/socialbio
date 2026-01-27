import User from "@/models/user";
import { currentUser } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const { emailAddresses } = await currentUser();
  try {
    await connectToDatabase();
    let data = await User.findOne({ email: emailAddresses[0].emailAddress });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
