// import { getSession } from "../action/auth"
import ResidentList from "./pages/resident/page"


export default async function DashboardPage() {
  // const session = await getSession()

  return (
    <ResidentList />
  )
}
