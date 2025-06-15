import { LOGIN_ROUTE } from "@/shared/constants/Global.constants";
import { signOut } from "@/shared/lib/auth.lib";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await signOut();
  revalidatePath(LOGIN_ROUTE);
  return NextResponse.redirect(new URL(LOGIN_ROUTE, req.nextUrl))
}