import React, { useState } from "react";
import {
  CheckCircle,
  MoreVertical,
  Flag,
  Trash2,
  Calendar,
  Pickaxe,
} from "lucide-react";
import {
  deleteTask,
  addTaskDueDate,
  changeTaskPriority,
  changeTaskStatus,
} from "../utils/addTask";

const priorities = ["Low", "Normal", "High", "Urgent"];
import { useRef } from "react";

import { toast } from "react-toastify";

const TaskBar = ({
  title,
  priority,
  dueDate,
  status,
  comment,
  taskId,
  setRefetchFlag,
}) => {
  const dateInputRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(
    priority || "Normal"
  );
  const [selectedDate, setSelectedDate] = useState(dueDate || "");
  const [isDone, setIsDone] = useState(status === "completed");

  // const [commentText, setCommentText] = useState(comment);

  const handleIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker?.();
      dateInputRef.current.click();
    }
  };

  const handleDateChange = (e) => {
    try {
      setSelectedDate(e.target.value);
      addTaskDueDate({
        taskId,
        dueDate: e.target.value,
        setRefetchFlag: () => setRefetchFlag((prev) => !prev),
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePriorityChange = (value) => {
    try {
      setSelectedPriority(value);
      setShowDropdown(false);
      changeTaskPriority({
        taskId,
        priority: value,
        setRefetchFlag: () => setRefetchFlag((prev) => !prev),
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleDelete = () => {
    try {
      const data = deleteTask({
        taskId,
        setRefetchFlag: () => setRefetchFlag((prev) => !prev),
      });

      setShowOptions(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  // const handleComment = () => {
  //   try {
  //     const data = addTaskComment({
  //       taskId,
  //       comment: commentText,
  //       setRefetchFlag: () => setRefetchFlag((prev) => !prev),
  //     });
  //     setShowOptions(false);
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };
  const handleStart = () => {
    try {
      const data = changeTaskStatus({
        taskId,
        status: "in-progress",
        setRefetchFlag: () => setRefetchFlag((prev) => !prev),
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleDone = () => {
    try {
      const newStatus = isDone ? "pending" : "completed";
      setIsDone(!isDone); // Update local state immediately
      const data = changeTaskStatus({
        taskId,
        status: newStatus,
        setRefetchFlag: () => setRefetchFlag((prev) => !prev),
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={` ${
        status === "completed"
          ? "border-2  border-green-400"
          : "border-0 border-gray-300"
      } bg-white dark:bg-black text-black dark:text-white p-4 rounded-xl flex flex-wrap md:flex-nowrap items-start md:items-center justify-between shadow-md relative gap-3 md:gap-6 w-full`}
    >
      <div
        onClick={handleDone}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${
          isDone
            ? "border-green-500 bg-green-500"
            : "border-gray-400 dark:border-gray-600"
        }`}
      >
        {isDone && <CheckCircle className='w-4 h-4 text-white' />}
      </div>

      <div className='flex-1 min-w-[200px]'>
        <span className='block text-sm font-medium break-words'>{title}</span>
        {comment && (
          <span className='block text-xs text-gray-600 dark:text-gray-400 mt-1'>
            {comment}
          </span>
        )}
      </div>

      {status === "pending" && (
        <div className='absolute -top-2 left-12 text-xs text-yellow-600 dark:text-yellow-400'>
          pending
        </div>
      )}
      {status === "completed" && (
        <div className='absolute -top-1 left-12 text-sm font-semibold text-green-600 dark:text-green-400'>
          Completed
        </div>
      )}
      {status === "in-progress" && (
        <div className='absolute -top-2 left-12 text-xs text-indigo-500 dark:text-indigo-300'>
          In progress
        </div>
      )}

      <div className='relative'>
        <div
          className={`text-sm cursor-pointer flex items-center gap-1 ${
            selectedPriority === "Urgent"
              ? "text-red-700"
              : selectedPriority === "High"
              ? "text-red-500"
              : selectedPriority === "Normal"
              ? "text-yellow-600"
              : "text-blue-400"
          }`}
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          {selectedPriority}
          <Flag className='w-4 h-4' />
        </div>

        {showDropdown && (
          <div className='absolute top-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-10'>
            {priorities.map((p) => (
              <div
                key={p}
                onClick={() => handlePriorityChange(p)}
                className='px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer text-sm'
              >
                {p}
              </div>
            ))}
          </div>
        )}
      </div>
      {status === "pending" && (
        <div className='flex items-center gap-2'>
          <button
            className='flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600'
            onClick={handleStart}
          >
            <Pickaxe className='w-4 h-4' />
            Start
          </button>
        </div>
      )}

      {dueDate ? (
        <div className='text-sm text-green-600 flex items-center gap-1'>
          <Calendar className='w-4 h-4' />
          {new Date(dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </div>
      ) : (
        <div className='relative flex items-center gap-2'>
          <button
            onClick={handleIconClick}
            className='flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600'
          >
            <Calendar className='w-4 h-4' />
          </button>

          <input
            ref={dateInputRef}
            type='date'
            value={selectedDate || ""}
            onChange={handleDateChange}
            className='absolute opacity-0 pointer-events-none w-0 h-0'
            tabIndex={-1}
          />
        </div>
      )}

      {/* Options Dropdown */}
      <div className='relative'>
        <MoreVertical
          className='w-5 h-5 text-gray-500 dark:text-gray-300 cursor-pointer'
          onClick={() => setShowOptions((prev) => !prev)}
        />
        {showOptions && (
          <div className='absolute right-0 top-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-10 w-32'>
            <button
              className='w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-2'
              onClick={() => handleDelete()}
            >
              <Trash2 className='w-4 h-4' /> Delete
            </button>
            {/* <button
              className='w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm flex items-center gap-2'
              onClick={handleComment}
            >
              <MessageCircle className='w-4 h-4' /> Comment
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskBar;
