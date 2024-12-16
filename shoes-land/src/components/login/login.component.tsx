import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { SignInFormData, LoginSchema } from "../FormType";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaArrowLeft } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

const MAX_ATTEMPTS = 5;
const LOCK_TIME = 5 * 60 * 1000;

interface LoginFormProps {
  setPage: (value: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setPage }) => {
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [passIsFocused, setPassIsFocused] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(LoginSchema),
  });

  useEffect(() => {
    const attempts = Number(localStorage.getItem("loginAttempts")) || 0;
    const lockTime = Number(localStorage.getItem("lockTime"));

    if (attempts >= MAX_ATTEMPTS && lockTime) {
      const now = Date.now();
      if (now - lockTime < LOCK_TIME) {
        setIsLocked(true);
      } else {
        localStorage.removeItem("loginAttempts");
        localStorage.removeItem("lockTime");
        setIsLocked(false);
      }
    }
  }, []);

  const onSubmit = (data: SignInFormData) => {
    if (isLocked) {
      toast.warning("ورود برای شما قفل شده است، لطفا بعدا تلاش کنید");
      const savedTime = localStorage.getItem("lockTime");

      if (savedTime) {
        const timestamp = Number(savedTime);

        const date = new Date(timestamp);

        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        toast.warning(`${hours}:${minutes}:${seconds}`);
      }

      return;
    }

    const isPasswordCorrect = checkPassword(data);
    if (!isPasswordCorrect) {
      const attempts = Number(localStorage.getItem("loginAttempts")) || 0;
      if (attempts + 1 >= MAX_ATTEMPTS) {
        localStorage.setItem("lockTime", Date.now().toString());
        setIsLocked(true);
      }
      localStorage.setItem("loginAttempts", (attempts + 1).toString());
      toast.warning("رمز عبور اشتباه است");
    } else {
      localStorage.removeItem("loginAttempts");
      localStorage.removeItem("lockTime");
      toast.success("ورود موفقیت‌آمیز بود");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-evenly">
      {/* Back Button */}
      <button
        className="absolute top-[3%] left-[3%]"
        onClick={() => setPage("Onboarding")}
      >
        <FaArrowLeft size={24} />
      </button>

      {/* Logo */}
      <img className="mx-auto mt-32" src="logo/logoBlack.png" />

      {/* Login Form */}
      <h1 className="text-3xl font-bold text-center m-4">
        Login to Your Account
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mx-4">
        {/* Email Input */}
        <div className="flex items-center bg-gray-100 px-2 rounded-md">
          <FaEnvelope size={18} color={emailIsFocused ? "black" : "gray"} />
          <input
            className="w-full h-[36px] bg-gray-100 p-2 rounded-md focus:outline-none"
            {...register("email")}
            type="email"
            placeholder="Email"
            onFocus={() => setEmailIsFocused(true)}
            onBlur={() => setEmailIsFocused(false)}
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center bg-gray-100 px-2 rounded-md">
          <FaLock size={18} color={passIsFocused ? "black" : "gray"} />
          <input
            className="w-full h-[36px] bg-gray-100 p-2 rounded-md focus:outline-none"
            {...register("password")}
            type="password"
            placeholder="Password"
            onFocus={() => setPassIsFocused(true)}
            onBlur={() => setPassIsFocused(false)}
          />
        </div>

        {/* Options */}
        <div className="flex justify-between text-sm">
          <label>
            <input className="mr-1" type="checkbox" /> Remember me
          </label>
          <button
            type="button"
            className="text-blue-500"
            onClick={() => setPage("ForgotPassForm")}
          >
            Forgot Password?
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className={`w-full h-[48px] rounded-3xl bg-gray-600 text-white font-semibold mt-32 ${
            isLocked ? "bg-slate-400" : "bg-gray-800"
          }`}
        >
          Sing In
        </button>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          Don’t have an account?{" "}
          <button
            type="button"
            className="text-black font-semibold"
            onClick={() => setPage("SignUpForm")}
          >
            Register Now
          </button>
        </div>
      </form>
    </div>
  );
};

function checkPassword(data: SignInFormData): boolean {
  return data.password === "123456789";
}

export default LoginForm;
