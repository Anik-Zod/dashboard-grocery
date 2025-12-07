"use client";

import { MoveLeft, Shield, Star, Users } from "lucide-react";
import GoogleLoginButton from "./GoogleLoginButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { useAuthStore } from "@/store/useAuthStore";

type CredentialType = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<CredentialType>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore(state=>state.setUser)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!name) return; // skip any input without name
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e:React.MouseEvent<HTMLButtonElement> ) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`,
        {
          ...credentials,
        }
      );
     
      if(res.data.success == false)setError(res.data.message)
      console.log("data =",res.data);
      setUser(res.data.user)
      router.push("/")
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="h-full flex items-center justify-center bg-orange-50 px-0 sm:px-8 lg:px-20 fixed inset-0 z-60">
  {/* Back to Home */}
  <div
    onClick={() => router.push("/")}
    className="cursor-pointer hover:text-orange-400 flex absolute top-10 gap-3 justify-center items-center lg:left-36 sm:left-6 left-10"
  >
    <MoveLeft />
    <span className="font-medium">Back to Home</span>
  </div>

  {/* Main Wrapper */}
  <div className="w-full max-w-6xl rounded-xl flex flex-col lg:flex-row overflow-hidden bg-white">
    {/* Left Panel */}
    <div className=" lg:flex lg:w-1/2 p-10 flex-col justify-center bg-orange-50">
      <h2 className="text-4xl xl:text-5xl font-bold text-orange-600 mb-4">
        Welcome Back!
      </h2>
      <p className="text-gray-700 mb-6">
        Sign in to access your account, track orders, and enjoy personalized
        shopping experiences at{" "}
        <span className="text-green-600 font-semibold">Grocery</span>.
      </p>

      <ul className="space-y-5 hidden sm:block">
        {[
          {
            title: "Secure Authentication",
            desc: "Your data is protected with enterprise-grade security",
            icon: <Shield size={20} />,
          },
          {
            title: "Trusted by Thousands",
            desc: "Join our community of satisfied customers",
            icon: <Users size={20} />,
          },
          {
            title: "Premium Experience",
            desc: "Access exclusive deals and personalized recommendations",
            icon: <Star size={20} />,
          },
        ].map((item, idx) => (
          <li key={idx} className="flex items-start gap-4">
            <div className="p-3 bg-orange-200 rounded-xl text-orange-700 shrink-0">
              {item.icon}
            </div>
            <div>
              <p className="text-orange-600 font-semibold text-lg">{item.title}</p>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-gray-500">
        Need help? Contact{" "}
        <a
          href="mailto:support@shopcart.com"
          className="text-orange-600 hover:underline"
        >
          support@shopcart.com
        </a>
      </p>
    </div>

    {/* Right Panel */}
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 bg-orange-50">
      <div className="w-full lg:max-w-md bg-white rounded-xl p-6 sm:p-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Sign in to Dashboard
        </h3>

        {/* Auth Button */}
        <div className="mb-4">
          <GoogleLoginButton />
        </div>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <hr className="grow border-gray-300" />
          <span className="px-3 text-gray-400 text-sm">or</span>
          <hr className="grow border-gray-300" />
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              onChange={handleChange}
              required
              name="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              required
              name="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            onClick={handleLogin}
            className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {loading ? "Loading..." : "Continue"}
          </button>

          {error && (
            <div className="pt-1 text-center text-red-700 font-medium">{error}</div>
          )}
        </form>
      </div>
    </div>
  </div>
</div>

  );
}
