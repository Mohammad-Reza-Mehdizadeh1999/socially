import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { 
  Home, 
  Bell, 
  User, 
  LogOut,
  Moon, 
  Sun,
  Menu
} from 'lucide-react';
import MobileSidebar from './MobileSidebar';

interface HeaderProps {
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const handleLogout = () => {
    onLogout?.();
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Desktop Navigation - Left Side */}
            <nav className="hidden md:flex items-center space-x-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 
                         hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-200 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
                             focus:outline-none focus:ring-2 focus:ring-blue-500
                             ${isActive(link.path)
                               ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                               : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                             }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300
                         hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Logout"
              >
                <LogOut size={20} />
              </button>
            </nav>

            {/* Logo - Center (Mobile & Desktop) */}
            <div className="flex-1 md:flex-none md:absolute md:left-1/2 md:-translate-x-1/2 text-center">
              <Link 
                to="/"
                className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight hover:opacity-80 transition-opacity"
              >
                Socially
              </Link>
            </div>

            {/* Right Side - Desktop: Empty, Mobile: Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 
                         text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 
                         transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Open menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Menu size={24} />
              </button>
            </div>

            {/* Desktop Spacer for alignment */}
            <div className="hidden md:block w-12"></div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Component */}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Header;