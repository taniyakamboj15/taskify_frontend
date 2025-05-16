import React from "react";
import { Link } from "react-router-dom";
import ThemeChanger from "./ThemeChanger";
import "../global.css";
import { Sidebar as MenuIcon } from "lucide-react";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const handleToggle = () => {
    toggleSidebar();
  };

  return (
    <header className='w-[100vw] fixed top-0 flex items-center justify-between px-4 md:px-8 py-2 md:py-1 bg-white dark:bg-gray-900 shadow-sm'>
      <div className='flex  items-center gap-4 '>
        <div
          className={`btn btn-square btn-ghost transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "scale-x-[-1] " : "scale-x-100"
          }`}
          onClick={handleToggle}
        >
          <MenuIcon size={24} />
        </div>

        <Link
          to='/'
          className='text-xl md:text-3xl logo-text leading-[1.9] text-transparent overflow-visible whitespace-nowrap bg-clip-text bg-gradient-to-r from-indigo-400 to-gray-500 dark:from-indigo-300 dark:to-gray-300 transition-transform hover:scale-105 hover:tracking-wide duration-300 ease-in-out'
        >
          Taskify
        </Link>
      </div>
      <ThemeChanger />
    </header>
  );
};

export default Header;
