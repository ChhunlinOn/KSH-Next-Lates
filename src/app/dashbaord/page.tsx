// import { getSession } from "../action/auth"
import ResidentList from "./pages/resident/page"
// import { useUser } from "../Context/Programcontext";


export default async function DashboardPage() {
  // const session = await getSession()
  // if (!session) redirect("/login");
  // const { users, deleteUser } = useUser();

  return (
    <ResidentList />
  )
}
