// SubHeader.js
import React, { useState } from "react";
import { SlidersHorizontal, FileDown, ChevronDown } from "lucide-react";

const SubHeader = ({ text, onFilter, onExport }) => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleFilterApply = () => {
    onFilter({ priority: priorityFilter, status: statusFilter });
    setShowFilterDropdown(false);
  };

  return (
    <div>
      <div className='flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
        <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>
          {text}
        </h2>
        <div className='relative'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => {
                setShowFilterDropdown((prev) => !prev);
                setShowExportDropdown(false);
              }}
              className='flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-500'
            >
              <SlidersHorizontal size={16} /> Filter <ChevronDown size={16} />
            </button>
            <button
              onClick={() => {
                setShowExportDropdown((prev) => !prev);
                setShowFilterDropdown(false);
              }}
              className='flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-500'
            >
              <FileDown size={16} /> Export <ChevronDown size={16} />
            </button>
          </div>

          {showFilterDropdown && (
            <div className='absolute right-0 top-8 w-60 bg-white dark:bg-gray-800 border rounded-lg shadow-md p-4 z-50'>
              <div className='mb-3'>
                <label className='block text-sm mb-1'>Priority</label>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className='w-full px-2 py-1 border rounded dark:bg-gray-700'
                >
                  <option value='all'>All</option>
                  <option value='low'>Low</option>
                  <option value='normal'>Normal</option>
                  <option value='high'>High</option>
                  <option value='urgent'>Urgent</option>
                </select>
              </div>
              <div className='mb-3'>
                <label className='block text-sm mb-1'>Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className='w-full px-2 py-1 border rounded dark:bg-gray-700'
                >
                  <option value='all'>All</option>
                  <option value='pending'>Pending</option>
                  <option value='not-started'>Not Started</option>
                  <option value='in-progress'>In Progress</option>
                  <option value='completed'>Completed</option>
                </select>
              </div>
              <button
                onClick={handleFilterApply}
                className='w-full bg-indigo-500 text-white py-1 rounded hover:bg-indigo-600 text-sm'
              >
                Apply Filter
              </button>
            </div>
          )}

          {showExportDropdown && (
            <div className='absolute right-0 top-8 w-40 bg-white dark:bg-gray-800 border rounded-lg shadow-md z-50'>
              <button
                className='block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                onClick={() => {
                  onExport("json");
                  setShowExportDropdown(false);
                }}
              >
                Export as JSON
              </button>
              <button
                className='block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                onClick={() => {
                  onExport("pdf");
                  setShowExportDropdown(false);
                }}
              >
                Export as PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
