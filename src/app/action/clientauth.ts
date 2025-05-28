// src/action/auth.client.ts
"use client";

import Cookies from "js-cookie";

export function getSessionForClient() {
  const jwt = Cookies.get("jwt");
  const userRole = Cookies.get("userRole");
  const userImage = Cookies.get("userImage");

  if (!jwt) return null;
  return { jwt, userRole, userImage };
}
