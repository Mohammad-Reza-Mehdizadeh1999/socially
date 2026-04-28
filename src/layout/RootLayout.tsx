import { Outlet, useLocation } from "react-router";
import SideProfile from "../components/SideProfile";
import Header from "../components/Header";
import { useSessionQuery } from "../hooks/useSessionQuery";

const RootLayout = () => {
  const { isLoading } = useSessionQuery();

  const location = useLocation();
  console.log(location.pathname);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col dark:bg-black bg-white text-black dark:text-white">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <main className="flex flex-1 max-w-7xl mx-auto w-full gap-5 pt-25">
        {/* Left Side */}
        {!location.pathname.startsWith("/profile") && (
          <aside className="w-1/3 mt-5">
            <SideProfile />
          </aside>
        )}

        {/* Right Side (Pages) */}
        <section
          className={`${
            location.pathname.startsWith("/profile") ? "w-full" : "w-2/3"
          } dark:bg-black bg-white text-black dark:text-white`}
        >
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default RootLayout;
