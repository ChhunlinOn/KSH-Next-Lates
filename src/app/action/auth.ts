"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginResponse = {
  success: boolean;
  error?: string;
  user?: any;
};

export async function login(email: string, password: string): Promise<LoginResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error("API URL not defined");
    return { success: false, error: "API URL not configured" };
  }

  try {
    const loginData = {
      identifier: email,
      password: password,
    };

    const response = await fetch(`${apiUrl}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      cache: "no-store",
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error?.message || "Login failed",
      };
    }

    const jwt = result.jwt;
    const userId = result.user.id;

    const userResponse = await fetch(`${apiUrl}/users/${userId}?populate=role,profile_img`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      cache: "no-store",
      credentials: "include",
    });

    const userResult = await userResponse.json();

    if (!userResponse.ok) {
      return {
        success: false,
        error: userResult.error?.message || "Failed to fetch user details",
      };
    }

    const roleName = userResult.role?.name;
    const profileImage = userResult.profile_img?.formats?.thumbnail?.url || null;

    const cookieStore = await cookies();

    cookieStore.set("jwt", jwt, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });

    cookieStore.set("userRole", roleName || "", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });

    if (profileImage) {
      cookieStore.set("userImage", profileImage, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        sameSite: "lax",
      });
    }

    console.log("Cookies set:", {
      jwt: cookieStore.get("jwt")?.value,
      userRole: cookieStore.get("userRole")?.value,
      userImage: cookieStore.get("userImage")?.value,
    });

    return {
      success: true,
      user: {
        id: userId,
        role: roleName,
        profileImage,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("jwt");
  cookieStore.delete("userRole");
  cookieStore.delete("userImage");
  cookieStore.delete("userName");
  cookieStore.delete("userId");
  redirect("/login");
}

export async function getSession() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;
  const userRole = cookieStore.get("userRole")?.value;
  const userImage = cookieStore.get("userImage")?.value;

  if (!jwt) {
    return null;
  }

  return {
    jwt,
    userRole,
    userImage,
  };
}