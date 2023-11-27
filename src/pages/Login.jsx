import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [errormsg, setErrorMsg] = useState("");
  const from = location?.state?.from?.pathname || "/";
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await signIn(email, password);
      toast.success("signed in successfully.");
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMsg(error.message);
      toast.error("could not sign in");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col 2xl:w-1/4 p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
            <p className="-pt-2 h-3 text-red-700 italic text-sm">{errormsg}</p>
          </div>

          <div>
            <button
              type="submit"
              className="bg-red-600 w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <div className="space-y-1">
          <button className="text-xs hover:underline hover:text-rose-500 text-gray-400">
            Forgot password?
          </button>
        </div>
        <div className="flex items-center pt-4 space-x-1"></div>
        <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            to="/signup"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
