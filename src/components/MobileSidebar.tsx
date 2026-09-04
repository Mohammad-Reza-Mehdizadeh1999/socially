import { Bell, BookPlus, House, LogIn, LogOut, UsersRound, X } from "lucide-react";
import { logoutRequest } from "../services/authServices";
import { NavLink, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

interface sidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MobileSidebar(props: sidebarProps) {
  const { isOpen, setIsOpen } = props;

  const { isAuthenticated } = useAuthStore();

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { logout: logoutStore } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logoutRequest();
      logoutStore();
      queryClient.removeQueries({ queryKey: ["session"] });
      navigate("/login");
      toast.success("Logout successfully");
    } catch (err) {
      toast.error("logout failed...");
      console.log(err);
    }
  };

  return (
    <>
      <div
        className={`h-screen md:hidden z-100 fixed top-0 bottom-0 right-0 w-2xs bg-white dark:bg-[#0A0A0A] p-5 duration-200 ease-in  ${isOpen ? "translate-x-0" : "translate-x-full"} `}
      >
        <div className="flex items-center justify-between mb-5">
          <p className="font-semibold text-[16px] dark:text-white">Menu</p>

          <X
            size={16}
            className="dark:text-white cursor-pointer"
            onClick={handleToggleSidebar}
          />
        </div>

        <div className=" w-full flex flex-col items-center justify-center bg-white dark:bg-transparent">
          {isAuthenticated ? (
            <div className=" w-full flex flex-col items-center justify-around gap-10 h-9 bg-transparent dark:bg-transparent">
              <NavLink
                to={"/"}
                className="w-3/4 h-9 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#eeeeee] rounded-md px-3 py-2  dark:bg-[#3f3f3f] dark:hover:bg-[#262626]"
              >
                <p className="text-[14px] text-[#171717] dark:text-[#FAFAFA]">
                  Home
                </p>
                <House size={16} className="dark:text-[#FAFAFA]" />
              </NavLink>

              <NavLink
                to={"/notifications"}
                className="w-3/4 h-9 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#eeeeee] rounded-md px-3 py-2  dark:bg-[#3f3f3f] dark:hover:bg-[#262626]"
              >
                <p className="text-[14px] text-[#171717] dark:text-[#FAFAFA]">
                  Notification
                </p>
                <Bell size={16} className="dark:text-[#FAFAFA]" />
              </NavLink>

              <NavLink
                to={"/profile/1"}
                className="w-3/4 h-9 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#eeeeee] rounded-md px-3 py-2 dark:bg-[#3f3f3f] dark:hover:bg-[#262626]"
              >
                <p className="text-[14px] text-[#171717] dark:text-[#FAFAFA]">
                  Profile
                </p>
                <UsersRound
                  size={16}
                  strokeWidth={1.75}
                  className="dark:text-[#FAFAFA]"
                />
              </NavLink>

              <div
                onClick={handleLogout}
                className="w-full h-9 items-center justify-center gap-2 cursor-pointer hover:bg-[#eeeeee] rounded-md py-2  dark:hover:bg-[#262626] flex"
              >
                <p className="text-[14px] text-[#171717] dark:text-[#FAFAFA]">
                  Logout
                </p>
                <LogOut size={16} className="dark:text-[#FAFAFA]" />
              </div>
            </div>
          ) : (
            <div className=" w-full flex flex-col items-center justify-around gap-5 pt-3 h-9 bg-transparent dark:bg-transparent">
              <NavLink
                to={"/"}
                className="w-3/4 h-9 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#eeeeee] rounded-md px-3 py-2  dark:bg-[#3f3f3f] dark:hover:bg-[#262626]"
              >
                <p className="text-[14px] text-[#171717] dark:text-[#FAFAFA]">
                  Home
                </p>
                <House size={16} className="dark:text-[#FAFAFA]" />
              </NavLink>

              <NavLink
                to={"/login"}
                className="w-3/4 h-9 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#eeeeee] rounded-md px-3 py-2  dark:bg-[#3f3f3f] dark:hover:bg-[#262626]"
              >
                <p className="text-[14px] text-[#171717] dark:text-[#FAFAFA]">
                  Sign In
                </p>
                <LogIn size={16} className="dark:text-[#FAFAFA]" />
              </NavLink>

              <NavLink
                to={"/register"}
                className="w-3/4 h-9 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#eeeeee] rounded-md px-3 py-2  dark:bg-[#3f3f3f] dark:hover:bg-[#262626]"
              >
                <p className="text-[14px] text-[#171717] dark:text-[#FAFAFA]">
                  Sign Up
                </p>
                <BookPlus size={16} className="dark:text-[#FAFAFA]" />
              </NavLink>



            </div>
          )}
        </div>
      </div>
    </>
  );
}
