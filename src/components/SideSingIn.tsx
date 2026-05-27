import { Link } from "react-router";

const SideSingIn = () => {
  return(
    <div className= "mt-6 ms-9 max-w-lg bg-white dark:bg-[#121212] text-gray-900 dark:text-white rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl transition-colors duration-300">
        <h1 className="font-semibold text-center text-xl">Welcome Back!</h1>
        <p className="text-center text-gray-500">Sign in to access your profile and connect with others.</p>
        <div className="flex flex-col mt-6">
            <Link
                to="/login"
                className="w-full p-1 text-center mt-2 border border-gray-200 text-black hover:bg-gray-50  dark:text-white dark:bg-border-dark dark:hover:bg-border-dark/10 dark:border-secondary-dark rounded-lg h-9 hover:opacity-90 transition"
              >
                Sign in
              </Link>
            <Link
                to="/register"
                className="w-full p-1 text-center mt-2 bg-black text-white dark:bg-white dark:text-black rounded-lg h-9 hover:opacity-90 transition"
              >
                Sign up
              </Link>
        </div>
    </div>
  );
};

export default SideSingIn;
