import React, { useState, useEffect } from "react";
import SubHeader from "./SubHeader";
import useUserAuth from "../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import useGetAllTask from "../hooks/useGetAllTask";
import { toast } from "react-toastify";
import { addTaskTitle } from "../utils/addTask";
import TaskBar from "./TaskBar";
const AllTask = () => {
  const navigate = useNavigate();
  const { user, loading } = useUserAuth();
  const [title, setTitle] = useState("");
  const [refetchFlag, setRefetchFlag] = useState(false);

  const { tasks, taskLoading } = useGetAllTask(refetchFlag);
  console.log("Tasks:", tasks);
  useEffect(() => {
    if (!loading && !user) {
      console.log("User not found");
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleAddTask = async () => {
    if (!title.trim()) {
      toast.error("Task cannot be empty!");
      return;
    }

    try {
      await addTaskTitle({ title });
      setTitle("");
      setRefetchFlag((prev) => !prev); // trigger refetch
      toast.success("Task added successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to add task.");
    }
  };

  if (taskLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  return (
    <div>
      <SubHeader text='All Task' />
      <div className='flex flex-col gap-4 p-4'>
        <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-4'>
          <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
            Task List
          </h2>
          {tasks.length === 0 ? (
            <p className='text-gray-500 dark:text-gray-400'>
              No tasks added yet – let’s get started! Add your first task and
              take a step toward productivity!
            </p>
          ) : (
            <ul className='pl-1 md:pl-5'>
              {tasks.map((task) => (
                <li
                  key={task._id}
                  className='text-gray-700 dark:text-gray-300 mt-2 pt-2'
                >
                  <TaskBar
                    title={task.title}
                    comment={task.comment}
                    status={task.status}
                    priority={task.priority}
                    taskId={task._id}
                    dueDate={task.dueDate}
                  />
                </li>
              ))}
            </ul>
          )}
          <div className='mt-6'>
            <div className='flex items-center'>
              <input
                type='text'
                placeholder='Add your task...'
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className='flex-grow border border-gray-300 dark:border-gray-600 rounded-l-md p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    // Handle adding task
                    handleAddTask(title);
                    console.log("Task added:", e.target.value);
                    e.target.value = "";
                  }
                }}
              />
              <button
                className='bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-all duration-200'
                onClick={() => handleAddTask(title)}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTask;
