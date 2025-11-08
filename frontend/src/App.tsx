import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage, { action as authAction } from "./routes/auth_routes/Auth";
import DashBoardPage from "./routes/protected_routes/DashBoard";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import 'react-loading-skeleton/dist/skeleton.css';
export const port = import.meta.env.VITE_BACKEND_PORT;
function App() {
  const router = createBrowserRouter([
    {
      element: <div>Home Page</div>,
      path: "/",
    },
    {
      element: <AuthPage />,
      path: "/auth",
      action: authAction,
    },
    {
      element: <ProtectedRoutes />,
      path: "/",
      children: [
        {
          element: <DashBoardPage />,
          path: "/dashboard",
        },
      ],
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
