import React, { useState } from "react";
import { Flag, Trash2, CheckCircle, Pickaxe } from "lucide-react";
import TaskBar from "./TaskBar";
import { toast } from "react-toastify";
import {
  ChangeProjectStatus,
  ChangeProjectPriority,
  AddProjectComment,
  DeleteProject,
  AddProjectDueDate,
  UpdateProjectEndDate,
  UpdateProjectStartDate,
} from "../utils/addProject";
import { addProjectTaskTitle } from "../utils/addTask";
const priorities = ["low", "normal", "high", "urgent"];
import DateInput from "./DateInput";

const ProjectCard = ({
  projectId,
  title,
  description,
  comment: initialComment,
  status: initialStatus,
  priority: initialPriority,
  tasks = [],
  dueDate: initialDue,
  startDate: initialStart,
  endDate: initialEnd,
  setRefetchFlag,
}) => {
  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toISOString().split("T")[0] : "";

  const [status, setStatus] = useState(initialStatus || "not-started");
  const [priority, setPriority] = useState(initialPriority || "normal");
  const [comment, setComment] = useState(initialComment || "");
  const [editingComment, setEditingComment] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [startDate, setStartDate] = useState(formatDate(initialStart));
  const [endDate, setEndDate] = useState(formatDate(initialEnd));
  const [dueDate, setDueDate] = useState(formatDate(initialDue));
  const [taskTitle, setTaskTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStatusChange = () => {
    const newStatus = status === "not-started" ? "in-progress" : "completed";
    ChangeProjectStatus({ projectId, status: newStatus, setRefetchFlag });
    setStatus(newStatus);
  };

  const handlePriorityChange = (value) => {
    ChangeProjectPriority({ projectId, priority: value, setRefetchFlag });
    setPriority(value);
    setShowPriorityDropdown(false);
  };

  const handleAddProjectTask = async (taskTitle) => {
    try {
      setLoading(true);
      await addProjectTaskTitle({ title: taskTitle, projectId });
      setTaskTitle("");
      setRefetchFlag?.((prev) => !prev);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleCommentSave = () => {
    AddProjectComment({ projectId, comment, setRefetchFlag });
    setEditingComment(false);
  };

  const handleDateChange = (type, value) => {
    if (type === "startDate") {
      setStartDate(value);
      UpdateProjectStartDate({
        startDate: value,
        projectId,
        setRefetchFlag,
      });
    }
    if (type === "endDate") {
      setEndDate(value);
      UpdateProjectEndDate({ endDate: value, projectId, setRefetchFlag });
    }
    if (type === "dueDate") {
      setDueDate(value);
      console.log("duedate called");
      AddProjectDueDate({ dueDate: value, projectId, setRefetchFlag });
    }
  };

  const handleDelete = () => {
    DeleteProject({ projectId, setRefetchFlag });
  };

  return (
    <div className='bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-2xl shadow-xl mb-6 w-full'>
      <div className='flex justify-between items-start flex-wrap gap-3 mb-4'>
        <div className='max-w-full break-words overflow-hidden'>
          <h2 className='text-xl font-semibold break-words'>{title}</h2>
          <p className='text-sm text-gray-600 dark:text-gray-400 break-words'>
            {description}
          </p>

          {editingComment ? (
            <div className='flex items-center gap-2 mt-2'>
              <input
                type='text'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className='border px-2 py-1 text-sm rounded-md dark:bg-gray-800'
              />
              <button
                onClick={handleCommentSave}
                className='text-xs bg-green-500 text-white px-2 py-1 rounded'
              >
                Save
              </button>
            </div>
          ) : comment ? (
            <p className='text-xs mt-1 text-gray-500 dark:text-gray-300'>
              💬 {comment}{" "}
              <button
                onClick={() => setEditingComment(true)}
                className='text-blue-500 underline text-[10px]'
              >
                Edit
              </button>
            </p>
          ) : (
            <button
              onClick={() => setEditingComment(true)}
              className='text-blue-500 text-xs mt-2 underline'
            >
              + Add Comment
            </button>
          )}
        </div>

        <div className='flex flex-col gap-2 items-end text-sm'>
          {status !== "completed" && (
            <button
              onClick={handleStatusChange}
              className='text-xs bg-blue-500 text-white px-2 py-1 rounded flex items-center gap-1'
            >
              {status === "not-started" ? (
                <>
                  <Pickaxe className='w-3 h-3' /> Start
                </>
              ) : (
                <>
                  <CheckCircle className='w-3 h-3' /> Mark Completed
                </>
              )}
            </button>
          )}
          <span
            className={`font-medium ${
              status === "completed"
                ? "text-green-600"
                : status === "in-progress"
                ? "text-blue-500"
                : "text-yellow-500"
            }`}
          >
            {status}
          </span>

          <div className='relative cursor-pointer'>
            <div
              onClick={() => setShowPriorityDropdown((prev) => !prev)}
              className={`flex items-center gap-1 ${
                priority === "urgent"
                  ? "text-red-700"
                  : priority === "high"
                  ? "text-red-500"
                  : priority === "normal"
                  ? "text-yellow-600"
                  : "text-blue-400"
              }`}
            >
              {priority}
              <Flag className='w-4 h-4' />
            </div>
            {showPriorityDropdown && (
              <div className='absolute top-6 right-0 bg-white dark:bg-gray-800 border rounded shadow-lg z-10'>
                {priorities.map((p) => (
                  <div
                    key={p}
                    onClick={() => handlePriorityChange(p)}
                    className='px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                  >
                    {p}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleDelete}
            className='text-red-500 flex items-center text-xs hover:underline'
          >
            <Trash2 className='w-3 h-3 mr-1' /> Delete
          </button>
        </div>
      </div>

      <div className='flex flex-wrap gap-6 text-sm text-gray-700 dark:text-gray-300 mb-4'>
        <DateInput
          label='Start'
          date={startDate}
          onChange={(val) => handleDateChange("startDate", val)}
        />
        <DateInput
          label='End'
          date={endDate}
          onChange={(val) => handleDateChange("endDate", val)}
        />
        <DateInput
          label='Due'
          date={dueDate}
          onChange={(val) => handleDateChange("dueDate", val)}
        />
      </div>

      {tasks.length > 0 ? (
        <div className='space-y-4'>
          {tasks.map((task) => (
            <TaskBar
              key={task._id}
              title={task.title}
              comment={task.comment}
              status={task.status}
              priority={task.priority}
              taskId={task._id}
              dueDate={task.dueDate}
              setRefetchFlag={setRefetchFlag}
            />
          ))}
        </div>
      ) : (
        <p className='text-sm text-gray-400 italic'>
          No tasks added to this project.
        </p>
      )}
      <div className='mt-6'>
        <div className='flex items-center gap-2'>
          <input
            type='text'
            placeholder='Add your task...'
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && taskTitle && !loading) {
                handleAddProjectTask(taskTitle);
              }
            }}
            className='flex-grow border border-gray-300 dark:border-gray-700 rounded px-3 py-2 text-sm bg-white dark:bg-gray-800'
          />

          <button
            onClick={() => handleAddProjectTask(taskTitle)}
            disabled={!taskTitle || loading}
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm disabled:opacity-50 flex items-center justify-center gap-2'
          >
            {loading ? (
              <span className='loading loading-spinner loading-sm'></span>
            ) : (
              "Add"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
