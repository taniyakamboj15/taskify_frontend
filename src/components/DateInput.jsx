import React, { useState } from "react";
import { Calendar } from "lucide-react";

const DateInput = ({ label, date, onChange }) => {
  const [showInput, setShowInput] = useState(false);

  const formatDate = (d) => (d ? new Date(d).toISOString().split("T")[0] : "");

  return (
    <div className='flex items-center gap-2'>
      <Calendar
        className='w-4 h-4 cursor-pointer'
        onClick={() => setShowInput(true)}
      />
      {label}:
      {date && !showInput ? (
        <span
          onClick={() => setShowInput(true)}
          className='cursor-pointer border-b border-transparent hover:border-gray-500 dark:hover:border-gray-300'
          style={{ minWidth: "90px", display: "inline-block" }}
        >
          {new Date(date).toLocaleDateString("en-GB")}
        </span>
      ) : showInput ? (
        <input
          type='date'
          value={formatDate(date)}
          onChange={(e) => {
            onChange(e.target.value);
            setShowInput(false);
          }}
          onBlur={() => setShowInput(false)}
          className='bg-transparent border-b focus:outline-none dark:bg-gray-900'
          autoFocus
        />
      ) : (
        <></>
      )}
    </div>
  );
};
export default DateInput;
