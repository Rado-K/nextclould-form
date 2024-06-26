import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateLimitMap = new Map();

const allolOrigins =
  process.env.NODE_ENV === "production" ? [] : ["http://localhost:3000"];

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");

  // if (origin && !allolOrigins.includes(origin)) {
  //   return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  // }

  const ip = request.headers.get("X-Forwarded-For");
  const limit = 2;
  const windowMs = 60 * 1000; // 1 minute

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, {
      count: 0,
      lastReset: Date.now(),
    });
  }

  const ipData = rateLimitMap.get(ip);

  if (Date.now() - ipData.lastReset > windowMs) {
    ipData.count = 0;
    ipData.lastReset = Date.now();
  }

  if (ipData.count >= limit) {
    return NextResponse.json({ message: "Too Many Requests" }, { status: 429 });
  }

  ipData.count += 1;

  return NextResponse.next();
}

export const config = {
  matcher: "/api/upload",
};
