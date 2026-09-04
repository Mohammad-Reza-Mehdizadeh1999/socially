import { useForm } from "react-hook-form";
// import { useState, type ChangeEvent } from "react";
import TextField from "../components/Ui/TextField";
import Button from "../components/Ui/Button";
import { useRegisterMutation } from "../hooks/useRegisterMutation";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import { UserPlus } from "lucide-react";


type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    mode: "onBlur",
  });

  const { mutate: registerMutation, isPending } = useRegisterMutation();
  const navigate = useNavigate();

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const onSubmit = (data: RegisterFormInputs) => {
    registerMutation(data, {
      onSuccess: () => {
        toast.success("Account created successfully!");
        navigate("/");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.error ?? "Registration failed");
        } else {
          toast.error("Something went wrong");
        }
      },
    });
  };



  return (
    <div className="min-h-svh flex items-center justify-center bg-secondary-50 dark:bg-[#0a0a0a] px-4 sm:px-6 lg:px-8 py-8 dark:text-white">
      <div className="flex flex-col items-center w-full max-w-4xl gap-6">
        
        <div className="w-full grid grid-cols-1 md:grid-cols-2 rounded-xl border border-[#E5E5E5] dark:border-[#2e2e2e] shadow-sm overflow-hidden bg-secondary-0 dark:bg-[#262626]">
          
          <div className="p-6 md:p-8 bg-white dark:bg-[#0a0a0a] flex flex-col justify-center">

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 items-center text-center">
                <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
                  Create your account
                </h1>
                <p className="text-[#737373] dark:text-[#A3A3A3]">
                  Enter your details below to create your account
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <TextField
                  label="Name"
                  type="text"
                  placeholder="Enter your name"
                  dir="ltr"
                  isRequired
                  error={errors.name?.message}
                  {...register("name", {
                    required: "Name is required",
                  })}
                />

                <TextField
                  label="Email"
                  type="email"
                  placeholder="m@example.com"
                  dir="ltr"
                  isRequired
                  error={errors.email?.message}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: emailPattern,
                      message: "Invalid email address format",
                    },
                  })}
                />

                <TextField
                  label="Password"
                  type="password"
                  placeholder="*********"
                  dir="ltr"
                  isRequired
                  error={errors.password?.message}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className={`border p-2 rounded-lg bg-black text-white mt-3 md:mb-4 w-full dark:bg-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-200 disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-black`}
              >
                {isPending ? <p className="spinner-mini"></p> : "Create Account"}
              </Button>

              <p className="text-center text-[#737373] dark:text-[#A3A3A3] text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="underline underline-offset-4 hover:text-secondary-900 dark:hover:text-white transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>

          <div className="hidden md:flex flex-col items-center justify-center p-12 bg-linear-to-br from-blue-600/20 to-purple-600/20 border-l border-gray-100 dark:border-gray-800">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <UserPlus className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
                Get Started Today
              </h2>
              <p className="text-secondary-500 dark:text-gray-400">
                Join our community and start your journey
              </p>
            </div>
          </div>

        </div>

        <p className="text-center text-sm text-[#737373] dark:text-[#A3A3A3] px-6 leading-relaxed">
          By clicking continue, you agree to our{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-secondary-900 dark:hover:text-white transition-colors"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-secondary-900 dark:hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
          .
        </p>

      </div>
    </div>
  );
}