import React, { useEffect } from "react";
import { Home, Bell, User, LogOut, Moon, Sun, X } from "lucide-react";
import { Link, useLocation } from "react-router";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  onLogout: () => void;
}

interface NavLink {
  path: string;
  icon: React.ComponentType<{ size: number }>;
  label: string;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isOpen,
  onClose,
  isDark,
  toggleTheme,
  onLogout,
}) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks: NavLink[] = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/notifications", icon: Bell, label: "Notifications" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Menu from Right */}
      <div
        className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white dark:bg-black 
                  border-l border-gray-200 dark:border-gray-800 shadow-2xl 
                  transform transition-transform duration-300 ease-out
                  ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Menu
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 
                     text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 
                     transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Content */}
        <nav className="p-4 space-y-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg 
                     bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300
                     hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
            <span className="font-medium">
              {isDark ? "Light Mode" : "Dark Mode"}
            </span>
          </button>

          {/* Navigation Links */}
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         ${
                           isActive(link.path)
                             ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                             : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                         }`}
              >
                <Icon size={20} />
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg 
                     bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400
                     hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-red-500 mt-4 border-t 
                     border-gray-200 dark:border-gray-800"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            © 2026 Socially
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
