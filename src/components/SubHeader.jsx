import React from "react";
import { SlidersHorizontal, FileDown, ChevronDown } from "lucide-react";
const SubHeader = ({ text }) => {
  return (
    <div>
      <div className='flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
        <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>
          {text}
        </h2>
        <div className='flex items-center gap-4'>
          <button className='flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-500'>
            <SlidersHorizontal size={16} />
            Filter
            <ChevronDown size={16} />
          </button>
          <button className='flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-500'>
            <FileDown size={16} />
            Export
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
