import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { port } from "../App";

export function useUser() {
  const [isChecking, setIsChecking] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const response = await fetch(`${port}/auth/me`, {
          method: "GET",
          credentials: "include",
        });


        if (response.status !== 200) {
          if (!mounted) return;
          setIsChecking(false);
          navigate("/auth?mode=login");
          return;
        }

        const responseData = await response.json();
        setUser(responseData);
        if (!mounted) return;
        setIsChecking(false);
      } catch (error: any) {
        if (!mounted) return;
        console.error("Authentication check failed:", error);
        setIsChecking(false);
        navigate("/auth?mode=login");
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  return { isChecking, user };
}
