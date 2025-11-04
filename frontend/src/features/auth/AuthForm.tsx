import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import AuthInput from "./AuthInput";
import { useEffect } from "react";
import LoadingSpinner from "../../shared/LoadingSpinner";

export default function AuthForm() {
  const [searchParams] = useSearchParams();
  const authType = searchParams.get("mode");

  const navigate = useNavigate();

  const navigation = useNavigation();

  const actionData = useActionData();

  useEffect(() => {
    if (authType !== "login" && authType !== "signup") {
      navigate("/auth?mode=login", { replace: true });
    }
  }, []);

  return (
    <Form
      className="w-[35%] justify-center flex flex-col shadow-xl bg-white rounded-[8px] gap-16 h-[70%] border-[1px] border-gray-300"
      method="post"
    >
      <section className="flex flex-col gap-4 justify-center items-center">
        <AuthInput
          name="username"
          placeholder="Please enter your username"
          label="Username"
        />
        <AuthInput
          label="Password"
          name="password"
          type="password"
          placeholder="Please enter your password"
        />
        {authType === "signup" && (
          <AuthInput
            label="Confirm Password"
            name="confirmpassword"
            type="password"
            placeholder="Please enter your password"
          />
        )}
        <span className="text-center text-[12px] text-red-600">
          {actionData?.detail}
        </span>
      </section>
      <section className="w-full flex justify-center items-center">
        {navigation.state === "submitting" ? (
          <LoadingSpinner />
        ) : (
          <button
            className="border-[1px] w-[50%] py-[10px] rounded-[8px] text-white bg-blue-600 hover:bg-blue-400 transition duration-300 cursor-pointer"
            type="submit"
          >
            Log in
          </button>
        )}
      </section>
    </Form>
  );
}
