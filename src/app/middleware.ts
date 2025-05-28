import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the JWT token from cookies
  const jwt = request.cookies.get("jwt")?.value

  // Define protected routes (note the correct spelling: dashboard, not dashbaord)
  const protectedRoutes = ["/dashbaord"] // Include both spellings for now

  // Check if the current path is a protected route or starts with one
  const isProtectedRoute = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  // If it's a protected route and no JWT token exists, redirect to login
  if (isProtectedRoute && !jwt) {
    console.log("No JWT found, redirecting to login")
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If user visits login page but already has a token, redirect to dashboard
  if (pathname === "/login" && jwt) {
    return NextResponse.redirect(new URL("/dashbaord/pages/resident", request.url))
  }

  // If user visits the root path, redirect based on authentication status
  if (pathname === "/") {
    if (jwt) {
      return NextResponse.redirect(new URL("/dashbaord/pages/resident", request.url))
    } else {
      return NextResponse.redirect(new URL("/login", request.url))
    }
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
