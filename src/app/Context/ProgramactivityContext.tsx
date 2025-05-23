"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import dotenv from "dotenv";
dotenv.config();

// Replace with your actual API base URL and token (consider using env variables in Next.js)
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
console.log(API_URL);
console.log(TOKEN);


export interface ProgramActivity {
  id: string;
  activity_name: string;
  activity_img: string;
  // Add more fields as needed
}





