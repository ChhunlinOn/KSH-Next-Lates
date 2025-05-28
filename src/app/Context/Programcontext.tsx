"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the shape of a User
export interface User {
  id: string;
  name: string;
  email: string;
  // Add more fields as needed
}

// Define the shape of the context
interface UserContextType {
  users: User[];
  createUser: (newUser: Partial<User>) => Promise<void>;
  updateUser: (id: string, updatedData: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

// Create context with initial undefined value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook for consuming the context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Props for the provider
interface UserProviderProps {
  children: ReactNode;
}

// Change this to your external API URL or use an env variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch all users once on load
useEffect(() => {
  const fetchUsers = async () => {
    try {
      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Sample users
      const sampleUsers: User[] = [
        { id: "1", name: "Alice", email: "alice@example.com" },
        { id: "2", name: "Bob", email: "bob@example.com" },
        { id: "3", name: "Charlie", email: "charlie@example.com" },
      ];

      setUsers(sampleUsers);
    } catch (error) {
      console.error("Error loading sample users:", error);
    }
  };

  fetchUsers();
}, []);


  // Create
  const createUser = async (newUser: Partial<User>) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const text = await res.text();

      if (!res.ok) {
        console.error("Failed to create user:", res.status, text);
        return;
      }

      const created: User = JSON.parse(text);
      setUsers((prev) => [...prev, created]);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Update
  const updateUser = async (id: string, updatedData: Partial<User>) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const text = await res.text();

      if (!res.ok) {
        console.error("Failed to update user:", res.status, text);
        return;
      }

      const updated: User = JSON.parse(text);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? updated : user))
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete
  const deleteUser = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Failed to delete user:", res.status, text);
        return;
      }

      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ users, createUser, updateUser, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
