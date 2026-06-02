import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Mail, Lock, LogIn } from "lucide-react";
import { loginRequest } from "../services/authService";
import { Link, useNavigate } from "react-router";
import Header from "../components/Header";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await loginRequest(data);
      if (res.status === 200) {
        toast.success("Login successful");
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (errors: any) => {
    if (errors.email?.message) {
      toast.error(errors.email.message);
    }
    if (errors.password?.message) {
      toast.error(errors.password.message);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-3 sm:p-4 md:p-6 transition-colors">
        <div className="w-full max-w-4xl">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Side - Form */}
              <div className="p-6 sm:p-8 md:p-10 lg:p-12">
                <div className="max-w-sm mx-auto">
                  {/* Header */}
                  <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
                      Welcome back
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 transition-colors">
                      Login to your Socially account
                    </p>
                  </div>

                  {/* Form */}
                  <form
                    onSubmit={handleSubmit(onSubmit, onError)}
                    className="space-y-5 sm:space-y-6"
                  >
                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-colors" />
                        </div>
                        <input
                          id="email"
                          type="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                          className={`block w-full pl-10 pr-3 py-3 text-sm sm:text-base border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                            errors.email
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
                          }`}
                          placeholder="m@example.com"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-colors" />
                        </div>
                        <input
                          id="password"
                          type="password"
                          {...register("password", {
                            required: "Password is required",
                            minLength: {
                              value: 6,
                              message: "Password must be at least 6 characters",
                            },
                          })}
                          className={`block w-full pl-10 pr-3 py-3 text-sm sm:text-base border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                            errors.password
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
                          }`}
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 dark:text-gray-900 dark:bg-gray-100 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <LogIn className="w-5 h-5 mr-2" />
                          Login
                        </>
                      )}
                    </button>

                    {/* Sign Up Link */}
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                        Don't have an account?{" "}
                        <Link
                          to="/register"
                          className="font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white underline underline-offset-2 transition-colors"
                        >
                          Sign up
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Side - Decorative */}
              <div className="hidden md:block bg-linear-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-600/20 dark:to-purple-600/20 border-l border-gray-200 dark:border-gray-800 transition-colors">
                <div className="h-full flex items-center justify-center p-8 lg:p-12">
                  <div className="text-center">
                    <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-6 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <LogIn className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
                    </div>
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
                      Join Our Community
                    </h2>
                    <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 transition-colors">
                      Connect with friends and share your moments
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 sm:mt-6 text-center px-2">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 transition-colors">
              By clicking continue, you agree to our{" "}
              <a
                href="/terms"
                className="underline underline-offset-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="underline underline-offset-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
