import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    // The middleware function is called when the user is authenticated
    // Additional logic can be added here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if the user is trying to access auth pages
        if (req.nextUrl.pathname.startsWith("/auth/")) {
          // If user is already authenticated, redirect to home
          return token ? false : true;
        }

        // For protected routes, require authentication
        if (req.nextUrl.pathname.startsWith("/booking/")) {
          return !!token;
        }

        // For admin routes, require admin access
        if (req.nextUrl.pathname.startsWith("/admin/")) {
          return !!token && token.isAdmin === true;
        }

        // Allow access to other routes
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
