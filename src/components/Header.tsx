import {Bell,House,LoaderCircle,LogOut,Menu,Moon,Sun,UsersRound} from "lucide-react";
import { useState } from "react";
import MobileSidebar from "./MobileSidebar";
import { NavLink, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { logoutRequest } from "../services/authServices";
import { splitUsername } from "../utils/splitUsername";
import { useTheme } from "../hooks/useTheme";
import UserSearch from "./Ui/UserSearch";

export default function Header() {
  const { toggleTheme } = useTheme();

  const { logout: logoutStore, isAuthenticated, user } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      await logoutRequest();
      logoutStore();
      queryClient.removeQueries({ queryKey: ["session"] });
      toast.success("Logout successfully");
      navigate("login");
    } catch (err) {
      toast.error("logout failed...");
      console.log(err);
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen}></MobileSidebar>

      <div className="sticky top-0 z-50 w-full h-16 border-b border-[#E5E5E5]/60 bg-white/70 backdrop-blur-xl dark:border-[#262626]/60 dark:bg-black/60">
        <div className="flex justify-between w-[80%] mx-auto items-center h-full">
          <p className="text-[#171717] text-[20px] font-bold dark:text-[#FAFAFA] ">
            Socially
          </p>

          {isAuthenticated && <UserSearch />}

          <nav className="mib-w-150 flex items-center gap-2 md:gap-10">
            <div
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center cursor-pointer hover:bg-[#eeeeee] border border-[#E5E5E5] dark:border-[#262626] rounded-md shadow shadow-[#0000001A] dark:hover:bg-[#262626]"
            >
              <Sun size={20} className="dark:hidden" />
              <Moon size={20} className="hidden dark:block dark:text-white" />
            </div>

            {isAuthenticated ? (
              <div className=" items-center justify-around gap-10 h-9 hidden md:flex">
                <NavLink
                  to={"/"}
                  className="h-9 flex items-center justify-between gap-2 cursor-pointer hover:bg-[#eeeeee] rounded-md px-3 dark:bg-[#0A0A0A] dark:hover:bg-[#262626]"
                >
                  <House size={16} className="dark:text-[#FAFAFA]" />
                  <p className="text-[14px] text-[#171717] dark:text-[#FAFAFA]">
                    Home
                  </p>
                </NavLink>

                <NavLink
                  to={"/notifications"}
                  className=" h-9 flex items-center justify-between gap-2 cursor-pointer hover:bg-[#eeeeee] rounded-md px-3 dark:bg-[#0A0A0A] dark:hover:bg-[#262626]"
                >
                  <Bell size={16} className="dark:text-[#FAFAFA]" />
                  <p className="text-[14px] text-[#171717] dark:text-[#FAFAFA]">
                    Notification
                  </p>
                </NavLink>

                <NavLink
                  to={`/profile/${splitUsername(user?.email || "")}`}
                  className="h-9 flex items-center justify-between gap-2 cursor-pointer hover:bg-[#eeeeee] rounded-md px-3 dark:bg-[#0A0A0A] dark:hover:bg-[#262626]"
                >
                  <UsersRound
                    size={16}
                    strokeWidth={1.75}
                    className="dark:text-[#FAFAFA]"
                  />
                  <p className="text-[14px] text-[#171717] dark:text-[#FAFAFA]">
                    Profile
                  </p>
                </NavLink>

                <div
                  onClick={handleLogout}
                  className="w-9 h-9 items-center justify-center cursor-pointer hover:bg-[#eeeeee] rounded-md dark:hover:bg-[#262626] hidden md:flex"
                >
                  {isLoggingOut ? (
                    <LoaderCircle
                      size={16}
                      className="animate-spin dark:text-[#FAFAFA]"
                    />
                  ) : (
                    <LogOut size={16} className="dark:text-[#FAFAFA]" />
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center justify-between gap-4">
                <NavLink
                  to={"/"}
                  className=" h-9 flex items-center justify-between gap-2 cursor-pointer hover:bg-[#17171780] rounded-md px-3 dark:bg-[#0A0A0A] dark:hover:bg-[#262626]"
                >
                  <House size={16} className="dark:text-[#FAFAFA]" />
                  <p className="text-[14px] text-[#171717] dark:text-[#FAFAFA]">
                    Home
                  </p>
                </NavLink>

                <NavLink
                  to={"/login"}
                  className="h-9 bg-[#0A0A0A] text-white flex items-center justify-between gap-2 cursor-pointer rounded-md px-6  hover:bg-[#17171780]"
                >
                  <p className="text-[14px] text-white dark:text-[#FAFAFA]">
                    Sign In
                  </p>
                </NavLink>
              </div>
            )}

            <div
              onClick={handleToggleSidebar}
              className="md:hidden w-9 h-9 flex items-center justify-center cursor-pointer hover:bg-[#eeeeee] border border-[#E5E5E5] dark:border-[#262626] rounded-md shadow shadow-[#0000001A] dark:hover:bg-[#262626] "
            >
              <Menu size={16} className="dark:text-[#FAFAFA]" />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
