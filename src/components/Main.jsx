import React from "react";
import { motion } from "framer-motion";
import LoginButton from "./Button";
import { useSelector } from "react-redux";
import useUserAuth from "../hooks/useUserAuth";
import { Navigate } from "react-router-dom"; // for redirection

const Main = () => {
  const user = useSelector((store) => store.user.user);
  useUserAuth(); // this can open login popup if needed, but should not be conditional

  if (user) {
    return <Navigate to='/alltask' replace />; // or any route you want
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 via-cyan-700 to-fuchsia-700 dark:from-zinc-800 dark:via-zinc-900 dark:to-black transition-all duration-500 px-4 text-center'>
      <motion.h1
        className='text-4xl md:text-6xl font-bold text-white dark:text-gray-100 mb-4'
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to <span className='text-yellow-300'>Taskify</span>
      </motion.h1>

      <motion.p
        className='text-lg md:text-xl text-white/90 dark:text-gray-300 mb-8 max-w-2xl'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        Organize smarter, not harder. Manage your tasks, stay productive, and
        take control of your goals.
      </motion.p>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4 }}
      >
        <LoginButton className='text-lg px-6 py-3 rounded-2xl shadow-lg bg-white text-black hover:bg-yellow-300 transition dark:bg-yellow-400 dark:hover:bg-yellow-300'>
          Login to Get Started 🚀
        </LoginButton>
      </motion.div>
    </div>
  );
};

export default Main;
