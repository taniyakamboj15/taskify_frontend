import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Provider } from "react-redux";
import appStore from "../redux/appStore";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/tablet on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Adjust breakpoint as needed
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <Provider store={appStore}>
      <div className='w-screen h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden'>
        <ToastContainer position='top-center' autoClose={2000} />

        {/* Header */}
        <div className='h-16 flex-shrink-0'>
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        </div>

        {/* Content: Sidebar + Main */}
        <div className='flex flex-1 overflow-hidden relative'>
          {/* Mobile Overlay (Blurred Background) */}
          {isMobile && isSidebarOpen && (
            <div
              className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20 lg:hidden'
              onClick={closeSidebar}
            />
          )}

          {/* Sidebar (Desktop: Pushes Content | Mobile: Overlay Drawer) */}
          <aside
            className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ease-in-out
              ${
                isMobile
                  ? `fixed inset-y-0 left-0 z-30 w-64 transform ${
                      isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`
                  : `${isSidebarOpen ? "w-64" : "w-0"}`
              }`}
          >
            <Sidebar closeSidebar={closeSidebar} />
          </aside>

          {/* Main Content (Adjusts Margin on Desktop) */}
          <main
            className={`flex-1 p-0.5 overflow-y-auto transition-all duration-300 ease-in-out ${
              !isMobile && isSidebarOpen ? "" : ""
            }`}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </Provider>
  );
};

export default Layout;
