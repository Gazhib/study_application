import { Navigate, redirect } from "react-router-dom";
import AuthForm from "../../features/auth/AuthForm";
import { useUser } from "../../shared/useUser";
import { port } from "../../App";

export default function AuthPage() {

  const {user} = useUser();

  if (user){
    return <Navigate to="/dashboard"/>
  }

  return (
    <main className="h-screen w-screen flex justify-center items-center bg-bg">
      <AuthForm />{" "}
    </main>
  );
}

export async function action({ request }: { request: Request }) {
  const fd = await request.formData();

  const response = await fetch(`${port}/auth/login`, {
    method: "POST",
    credentials: "include",
    body: fd,
  });

  if (response.status === 401) {
    const responseData = await response.json();
    return {detail: responseData.detail}
  }

  return redirect("/dashboard")
}
