import { Outlet } from "react-router";
import SideProfile from "../components/SideProfile";
import Header from "../components/Header";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <main className="flex flex-1 max-w-7xl mx-auto w-full px-4">
        {/* Left Side */}
        <aside className="w-1/3 pr-4">
          <SideProfile />
        </aside>

        {/* Right Side (Pages) */}
        <section className="w-2/3">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default RootLayout;