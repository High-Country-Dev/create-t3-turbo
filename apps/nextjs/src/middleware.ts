import type { NextMiddlewareResult } from "next/dist/server/web/types";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import type { AuthObject } from "@clerk/nextjs/dist/types/server";

const afterAuth = (
  auth: AuthObject & {
    isPublicRoute: boolean;
    isApiRoute: boolean;
  },
  req: NextRequest,
): NextMiddlewareResult => {
  if (!auth.userId && !auth.isPublicRoute) {
    if (!auth.isApiRoute) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  }
  return NextResponse.next();
};

export const config: { matcher: string[] } = {
  matcher: [
    /*
     * Match request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     *
     * This includes images, and requests from TRPC.
     */
    "/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)",
  ],
  // https://clerk.com/docs/nextjs/trpc
  // matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

export default authMiddleware({
  afterAuth,
});
