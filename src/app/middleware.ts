import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define protected routes and their allowed roles
const protectedRoutes = [
  {
    path: "/dashboard",
    allowedRoles: ["admin", "user", "editor"], // Add all your roles here
  },
  {
    path: "/dashboard/users",
    allowedRoles: ["admin"],
  },
  // Add more protected routes as needed
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the current path is a protected route
  const matchedRoute = protectedRoutes.find((route) => pathname === route.path || pathname.startsWith(`${route.path}/`))

  if (matchedRoute) {
    // Get the JWT token from cookies
    const jwt = request.cookies.get("jwt")?.value
    const userRole = request.cookies.get("userRole")?.value

    // If no JWT token, redirect to login
    if (!jwt) {
      const url = new URL("/login", request.url)
      url.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(url)
    }

    // If route has role restrictions, check if user has the required role
    if (matchedRoute.allowedRoles && matchedRoute.allowedRoles.length > 0) {
      if (!userRole || !matchedRoute.allowedRoles.includes(userRole)) {
        // User doesn't have the required role, redirect to dashboard home
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    }
  }

  // If the user is logged in and tries to access login page, redirect to dashboard
  if (pathname === "/login") {
    const jwt = request.cookies.get("jwt")?.value
    if (jwt) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  // Redirect root to dashboard if authenticated
  if (pathname === "/") {
    const jwt = request.cookies.get("jwt")?.value
    if (jwt) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    // If not authenticated, redirect to login
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public assets)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
