import { AUTH_COOKIE } from "@/features/auth/constant";
import { createAdminClient } from "@/lib/appwriteConfig";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const secret = request.nextUrl.searchParams.get("secret");

  if (!userId || !secret) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  if (!secret) {
    return NextResponse.error();
  }

  const { account } = await createAdminClient();
  const session = await account.createSession(userId, secret);

  cookies().set(AUTH_COOKIE, session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  return NextResponse.redirect(`${request.nextUrl.origin}/workspaces/create`);
}
