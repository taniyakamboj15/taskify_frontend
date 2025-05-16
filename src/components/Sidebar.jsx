import React, { useState } from "react";
import {
  Plus,
  Search,
  Layers,
  CalendarClock,
  CalendarArrowUp,
  FolderGit2,
  LogInIcon,
  LogOutIcon,
} from "lucide-react";

import Login from "./Login";
import { useSelector } from "react-redux";
import useHandleLogout from "../hooks/useHandleLogout";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ closeSidebar }) => {
  const [activeIcon, setActiveIcon] = useState("all");
  const isLogin = useSelector((state) => state.user.isLoggedIn);
  const [showLogin, setShowLogin] = useState(false);
  const handleLogout = useHandleLogout();
  const navigate = useNavigate();

  const handleLogin = () => {
    setShowLogin((prev) => !prev);
  };
  const handleLogoutButton = () => {
    handleLogout();
  };

  const handleIconClick = (icon) => {
    setActiveIcon(icon);
    if (icon === "all") {
      navigate("/allTask");
    } else if (icon === "allProjects") {
      navigate("/allProject");
    }

    if (closeSidebar) closeSidebar();
  };

  const isActive = (icon) =>
    activeIcon === icon ? "bg-indigo-100 text-indigo-600" : "";

  if (!isLogin) {
    return (
      <div>
        <div className='p-4 pl-3 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 flex flex-col gap-4'>
          <h2 className='text-sm font-semibold text-gray-500 dark:text-gray-200 mt-4'>
            Need Project and Task ?
          </h2>
          <div
            className='flex items-center gap-2 cursor-pointer hover:text-indigo-500 hover:bg-gray-300 p-1.5 rounded-md '
            onClick={handleLogin}
          >
            <LogInIcon />
            <h2 className='text-sm font-semibold text-gray-500 dark:text-gray-200 '>
              Sign Up or Log In !
            </h2>
          </div>
        </div>
        {showLogin && <Login onClose={handleLogin} />}
      </div>
    );
  }
  return (
    <div className='p-4 pl-8 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 flex flex-col gap-4'>
      {/* Top Actions */}
      {/* <div className='flex items-center space-x-4'>
        <div className='relative group flex flex-col items-center'>
          <Search
            size={28}
            className='bg-gray-300 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-1 rounded-sm cursor-pointer'
          />
          <span className='pointer-events-none absolute top-full mt-2 bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-10'>
            Search
          </span>
        </div>

        <div className='relative group flex flex-col items-center'>
          <Plus
            size={28}
            className='bg-gray-300 hover:bg-gray-200 p-1 rounded-sm cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600'
          />
          <span className='pointer-events-none absolute top-full mt-2 bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-10'>
            Add Task
          </span>
        </div>
      </div> */}

      {/* Task Links */}
      <div>
        <h2 className='text-lg font-semibold mt-4'>My Tasks</h2>
        <ul className='mt-2 flex flex-col gap-2'>
          <li
            onClick={() => handleIconClick("all")}
            className={`flex items-center gap-2 cursor-pointer hover:text-indigo-500 hover:bg-gray-300 p-1.5 rounded-md ${isActive(
              "all"
            )}`}
          >
            <Layers size={16} />
            <span>All Tasks</span>
          </li>
          {/* <li
            onClick={() => handleIconClick("today")}
            className={`flex items-center gap-2 cursor-pointer hover:text-indigo-500 hover:bg-gray-300 p-1.5 rounded-md ${isActive(
              "today"
            )}`}
          >
            <CalendarClock size={16} />
            <span>Today's Task</span>
          </li> */}
        </ul>
      </div>

      <div>
        <h2 className='text-lg font-semibold mt-4'>My Projects</h2>
        <ul className='mt-2 flex flex-col gap-2'>
          <li
            onClick={() => handleIconClick("allProjects")}
            className={`flex items-center gap-2 cursor-pointer hover:text-indigo-500 hover:bg-gray-300 p-1.5 rounded-md ${isActive(
              "allProjects"
            )}`}
          >
            <FolderGit2 size={16} />
            <span>All Projects</span>
          </li>
          {/* <li
            onClick={() => handleIconClick("upcoming")}
            className={`flex items-center gap-2 cursor-pointer hover:text-indigo-500 hover:bg-gray-300 p-1.5 rounded-md ${isActive(
              "upcoming"
            )}`}
          >
            <CalendarArrowUp size={16} />
            <span>Upcoming Projects</span>
          </li> */}
        </ul>
      </div>
      <div
        className='flex gap-2 p-2 rounded-sm cursor-pointer items-center hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-indigo-500'
        onClick={handleLogoutButton}
      >
        <LogOutIcon size={16} className='' />
        <span className=' text-gray-500 dark:text-gray-300'>Log Out</span>
      </div>
    </div>
  );
};

export default Sidebar;
