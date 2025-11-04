import { Outlet } from "react-router-dom";
import Header from "../widget/Header";
import { useUser } from "../shared/useUser";

export default function ProtectedRoutes() {

  const {isChecking} = useUser();

  if (isChecking) {
    return (
      <main className="w-full h-full">
        <Header />
        <div className="p-4">Checking authentication...</div>
      </main>
    );
  }

  return (
    <main className="w-full h-full">
      <Header />
      <Outlet />
    </main>
  );
}
