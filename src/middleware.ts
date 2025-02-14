import { NextRequest } from "next/server";

// a simple middle ware to console log the request in a pretty way
export default function middleware(request: NextRequest) {
  // console.log(`${request.method} ${request.url}`);
}


