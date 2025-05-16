import React, { useState } from "react";
import { LogInIcon } from "lucide-react";
import { useSelector } from "react-redux";
import Login from "./Login";

const LoginButton = () => {
  const isLogin = useSelector((state) => state.user.isLoggedIn);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = () => {
    setShowLogin((prev) => !prev);
  };

  if (isLogin) return null;

  return (
    <div>
      <div
        className='flex items-center gap-2 cursor-pointer hover:text-indigo-500 hover:bg-gray-300 p-1.5 rounded-md'
        onClick={handleLogin}
      >
        <LogInIcon />
        <h2 className='text-sm font-semibold text-gray-800 dark:text-gray-200'>
          Sign Up or Log In !
        </h2>
      </div>

      {showLogin && <Login onClose={handleLogin} />}
    </div>
  );
};

export default LoginButton;
