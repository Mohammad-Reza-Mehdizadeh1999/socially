import { Outlet, useLocation, Navigate } from "react-router";
import Header from "../components/Header";
import SideSignIn from "../components/SideSignIn";
import SideRecommendedUsers from "../components/SideRecommendedUsers";
import SideProfile from "../components/SideProfile";
import { useSession } from "../hooks/UseSession";

export default function RootLayout() {
  const location = useLocation();
  
  const { data, isLoading } = useSession();
  
  const isAuthenticated = !!data?.data?.user;

  const isHomePage = location.pathname === "/";
  
  const isProtectedRoute = location.pathname === "/notifications";

  if (isProtectedRoute && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary-50 dark:bg-[#262626]">
        <div className="text-center">
          <div className="spinner border-t-4 border-blue-500 rounded-full w-10 h-10 animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            در حال بارگزاری...
          </p>
        </div>
      </div>
    );
  }

  if (isProtectedRoute && !isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0A0A0A]">
      <header className="sticky top-0 z-10">
        <Header />
      </header>
      
      <div className="flex mx-auto w-[80%] md:w-[80%] mt-24 md:gap-5">
        <aside className={`${!isAuthenticated ? "hidden md:block" : "hidden"} w-full max-w-90`}>
          <SideSignIn />
        </aside>

        <aside className={`${isAuthenticated ? "hidden md:block" : "hidden"} w-full max-w-90`}>
          <SideProfile />
        </aside>

        <main className={`mx-auto  ${isAuthenticated && isHomePage ? "md:w-[80%] w-full" : "md:w-3/5"}`}>
          <Outlet />
        </main>

        <aside className={`${isAuthenticated && isHomePage ? "hidden lg:block" : "hidden"} w-full max-w-84`}>
          <SideRecommendedUsers />
        </aside>
      </div>
    </div>
  );
}