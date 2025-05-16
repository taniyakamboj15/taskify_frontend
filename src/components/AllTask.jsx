import React, { useState, useEffect } from "react";
import SubHeader from "./SubHeader";
import useUserAuth from "../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import useGetAllTask from "../hooks/useGetAllTask";
import { toast } from "react-toastify";
import { addTaskTitle } from "../utils/addTask";
import TaskBar from "./TaskBar";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable"; // for table support

const AllTask = () => {
  const navigate = useNavigate();
  const { user, loading } = useUserAuth();
  const [title, setTitle] = useState("");
  const [refetchFlag, setRefetchFlag] = useState(false);
  const { tasks: allTasks, taskLoading } = useGetAllTask(refetchFlag);

  const [filteredTasks, setFilteredTasks] = useState(allTasks);
  const [isFiltered, setIsFiltered] = useState(false);
  const tasks = isFiltered ? filteredTasks : allTasks;

  useEffect(() => {
    setFilteredTasks(allTasks);
  }, [allTasks]);

  useEffect(() => {
    if (!loading && !user) {
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

  const handleFilter = ({ priority, status }) => {
    setIsFiltered(true);
    const filtered = allTasks.filter((task) => {
      const matchPriority =
        priority === "all" ||
        task.priority.toLowerCase() === priority.toLowerCase();
      const matchStatus =
        status === "all" || task.status.toLowerCase() === status.toLowerCase();
      return matchPriority && matchStatus;
    });
    setFilteredTasks(filtered);
  };

  const handleExport = (format) => {
    if (format === "json") {
      const blob = new Blob([JSON.stringify(filteredTasks, null, 2)], {
        type: "application/json",
      });
      saveAs(blob, "tasks_export.json");
    } else if (format === "pdf") {
      const doc = new jsPDF();
      doc.text("Task List", 14, 16);
      const tableData = filteredTasks.map((task, index) => [
        index + 1,
        task.title,
        task.status,
        task.priority,
        task.createdAt ? new Date(task.createdAt).toLocaleDateString() : "-",
        task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-",
      ]);
      doc.autoTable({
        head: [
          ["No.", "Title", "Status", "Priority", "Created On", "Due Date"],
        ],
        body: tableData,
        startY: 20,
      });
      doc.save("tasks_export.pdf");
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
      <SubHeader
        text='All Tasks'
        onFilter={handleFilter}
        onExport={handleExport}
      />

      <div className='flex flex-col gap-4 p-4'>
        {isFiltered && tasks.length > 0 && (
          <p className='text-sm text-indigo-500 font-medium px-1 mb-2'>
            Showing filtered tasks
          </p>
        )}

        <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-4'>
          <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
            Task List
          </h2>

          {tasks.length === 0 ? (
            <p className='text-gray-500 dark:text-gray-400'>
              {isFiltered
                ? "No tasks match the current filter."
                : "No tasks added yet – let’s get started!"}
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
                    setRefetchFlag={setRefetchFlag}
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
                onChange={(e) => setTitle(e.target.value)}
                className='flex-grow border border-gray-300 dark:border-gray-600 rounded-l-md p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddTask(title);
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
