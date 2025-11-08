import { Outlet } from "react-router-dom";
import Header from "../widget/Header";
import { useUser } from "../stores/useUser";
import LoadingSpinner from "../shared/LoadingSpinner";
import { Toaster } from "react-hot-toast";

export default function ProtectedRoutes() {
  const { isChecking } = useUser();

  if (isChecking) {
    return (
      <main className="w-full min-h-screen bg-[#0A0C10]">
        <Header />
        <div className="h-screen w-full flex justify-center items-center">
          <LoadingSpinner />
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-[#0A0C10]">
      <Header />
      <Toaster />
      <Outlet />
    </main>
  );
}
