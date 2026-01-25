import React, { useEffect, useState } from 'react';
import { GiLightningFlame, GiMoonBats } from "react-icons/gi";

const ToggleDarkMode = () => {

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('isDarkMode');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }


    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <div
      onClick={() => setIsDarkMode(prev => !prev)}
      className=""
    >
      {isDarkMode ? (
        <GiLightningFlame className="text-5xl rounded-full px-2 py-2 dark:text-black bg-secondary-color cursor-pointer shadow-md" />
      ) : (
        <GiMoonBats className="text-5xl rounded-full px-2 py-2 bg-gray-200 cursor-pointer shadow-md" />
      )}
    </div>
  );
};

export default ToggleDarkMode;
