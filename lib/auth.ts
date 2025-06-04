"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export interface User {
  id: string
  email: string
  role: "user" | "admin"
  username: string
  createdAt: string
}

// Simulated user database
const users: User[] = [
  {
    id: "1",
    email: "admin@valorantpro.com",
    role: "admin",
    username: "admin",
    createdAt: "2023-01-01",
  },
  {
    id: "2",
    email: "user@example.com",
    role: "user",
    username: "testuser",
    createdAt: "2023-06-01",
  },
]

export async function login(email: string, password: string) {
  // Simulate authentication
  const user = users.find((u) => u.email === email)

  if (!user) {
    return { success: false, error: "Kullanıcı bulunamadı" }
  }

  // In real app, verify password hash
  if (password !== "password123") {
    return { success: false, error: "Şifre hatalı" }
  }

  // Set auth cookie
  const cookieStore = await cookies()
  cookieStore.set("auth-token", JSON.stringify(user), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return { success: true, user }
}

export async function register(email: string, password: string, username: string) {
  // Check if user exists
  const existingUser = users.find((u) => u.email === email)

  if (existingUser) {
    return { success: false, error: "Bu email adresi zaten kullanılıyor" }
  }

  // Create new user
  const newUser: User = {
    id: (users.length + 1).toString(),
    email,
    role: "user",
    username,
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)

  // Set auth cookie
  const cookieStore = await cookies()
  cookieStore.set("auth-token", JSON.stringify(newUser), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return { success: true, user: newUser }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
  redirect("/")
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get("auth-token")

    if (!authToken) {
      return null
    }

    const user = JSON.parse(authToken.value)
    return user
  } catch {
    return null
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }
  return user
}

export async function requireAdmin() {
  const user = await requireAuth()
  if (user.role !== "admin") {
    redirect("/dashboard")
  }
  return user
}
