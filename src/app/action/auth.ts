"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type LoginResponse = {
  success: boolean
  error?: string
  user?: any
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const loginData = {
      identifier: email,
      password: password,
    }

    const response = await fetch("https://strapi.ksh.thewmad.info/api/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      cache: "no-store",
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.error?.message || "Login failed",
      }
    }

    // Get the JWT token
    const jwt = result.jwt

    // Fetch user details
    const userId = result.user.id
    const userResponse = await fetch(`https://strapi.ksh.thewmad.info/api/users/${userId}?populate=role,profile_img`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      cache: "no-store",
    })

    const userResult = await userResponse.json()

    if (!userResponse.ok) {
      return {
        success: false,
        error: userResult.error?.message || "Failed to fetch user details",
      }
    }

    // Get user role and profile image
    const roleName = userResult.role?.name
    const profileImage = userResult.profile_img?.formats?.thumbnail?.url || null

    // Store auth data in cookies (more secure than localStorage)
    const cookieStore = await cookies()

    // Set cookies with HttpOnly for security
    cookieStore.set("jwt", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    // Store user data in cookies
    cookieStore.set("userRole", roleName || "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    if (profileImage) {
      cookieStore.set("userImage", profileImage, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      })
    }

    return {
      success: true,
      user: {
        id: userId,
        role: roleName,
        profileImage,
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}

export async function logout() {
  const cookieStore = await cookies()

  // Clear all auth cookies
  cookieStore.delete("jwt")
  cookieStore.delete("userRole")
  cookieStore.delete("userImage")

  // Redirect to login page after logout
  redirect("/login")
}

export async function getSession() {
  const cookieStore = cookies()
  const jwt = (await cookieStore).get("jwt")?.value
  const userRole = (await cookieStore).get("userRole")?.value
  const userImage = (await cookieStore).get("userImage")?.value

  if (!jwt) {
    return null
  }

  return {
    jwt,
    userRole,
    userImage,
  }
}
