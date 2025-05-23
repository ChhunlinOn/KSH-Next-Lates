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

// 1. Define the Program interface
export interface Program {
  id: string;
  program_type_name: string;
  img_url: string;
}

// 2. Define the context type
interface ProgramContextType {
  programs: Program[];
}

// 3. Create the context
const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

// 4. Create a custom hook
export const useProgram = (): ProgramContextType => {
  const context = useContext(ProgramContext);
  if (!context) {
    throw new Error("useProgram must be used within a ProgramProvider");
  }
  return context;
};

// 5. Provider Props
interface ProgramProviderProps {
  children: ReactNode;
}

// 6. Provider component
export const ProgramProvider: React.FC<ProgramProviderProps> = ({ children }) => {
  const [programs, setPrograms] = useState<Program[]>([]);

  // 7. Fetch function
const fetchPrograms = async () => {
  try {
    const response = await fetch(`${API_URL}/program-types?populate=*`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const result = await response.json();
    console.log(result.data);

    const formattedPrograms: Program[] = result.data.map((program: any) => ({
      id: program.id.toString(),
      program_type_name: program.attributes.program_type_name,
      img_url:
        program.attributes.img_url?.data?.[0]?.attributes?.url ?? program.attributes.program_type_name,// use your fallback here
    }));

    setPrograms(formattedPrograms);
  } catch (error) {
    console.error("Error fetching programs:", error);
  }
};

  // 8. UseEffect to call it once
  useEffect(() => {
    fetchPrograms();
  }, []);

  return (
    <ProgramContext.Provider value={{ programs }}>
      {children}
    </ProgramContext.Provider>
  );
};
