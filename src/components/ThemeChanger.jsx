import React, { useEffect, useState } from "react";
import DARK_MODE from "../assets/darkMode.webp";
import LIGHT_MODE from "../assets/lightMode.webp";

const ThemeChanger = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setIsDark(savedTheme === "dark");

    document.documentElement.setAttribute("data-theme", savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);

    document.documentElement.setAttribute("data-theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");

    localStorage.setItem("theme", newTheme);
  };

  return (
    <label className='cursor-pointer grid place-items-center relative w-10 h-10'>
      <input
        type='checkbox'
        checked={isDark}
        onChange={toggleTheme}
        className='toggle theme-controller absolute opacity-0 w-full h-full cursor-pointer'
      />
      <img
        src={isDark ? DARK_MODE : LIGHT_MODE}
        alt='Theme Icon'
        className='w-6 h-6'
      />
    </label>
  );
};

export default ThemeChanger;
