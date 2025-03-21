import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/dang-nhap", req.url));
  }

  // If token exists, continue
  return NextResponse.next();
}

// Only match paths that require auth
export const config = {
  matcher: ["/((?!dang-nhap|dang-ky).*)"],
};