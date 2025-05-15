import { redirect } from "next/navigation"
// import { getSession } from "./action/auth"

export default async function HomePage() {
  // Check if user is authenticated
  // const session = await getSession()

  // Redirect to dashboard if authenticated, otherwise to login
  // if (session) {
  //   redirect("/dashbaord") // Fixed the typo here
  // } else {
  //   redirect("/login")
  // }
  redirect
}
