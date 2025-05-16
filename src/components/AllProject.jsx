import React, { useState, useEffect } from "react";
import SubHeader from "./SubHeader";
import useUserAuth from "../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import useGetAllProjects from "../hooks/useGetAllProjects";
import { toast } from "react-toastify";
import { AddProjectTitle } from "../utils/addProject";
import { PlusIcon } from "lucide-react";
import ProjectCard from "./ProjectCard";
const AllProjects = () => {
  const navigate = useNavigate();
  const { user, loading } = useUserAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [refetchFlag, setRefetchFlag] = useState(false);

  const { projects, projectLoading } = useGetAllProjects(refetchFlag);
  console.log("projects:", projects);
  console.log("re renders");
  useEffect(() => {
    if (!loading && !user) {
      console.log("User not found");
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleAddProject = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("project name and description cannot be empty!");
      return;
    }

    try {
      await AddProjectTitle({ title, description });
      setRefetchFlag((prev) => !prev);
      setTitle("");
      setDescription("");
      toast.success("project added successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to add project.");
    }
  };

  if (projectLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  return (
    <div>
      <SubHeader text='All project' />
      <div className='flex flex-col gap-4 p-4'>
        <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-4'>
          {projects.length === 0 ? (
            <p className='text-gray-500 dark:text-gray-400'>
              No Projects added yet – let’s get started! Add your first Project
              and take a step toward productivity!
            </p>
          ) : (
            <ul className='pl-1 md:pl-5'>
              {projects.map((project) => (
                <li
                  key={project._id}
                  className='text-gray-700 dark:text-gray-300 mt-2 pt-2'
                >
                  <ProjectCard
                    title={project.name}
                    description={project.description}
                    comment={project.comment}
                    status={project.status}
                    priority={project.priority}
                    tasks={project.tasks}
                    dueDate={project.dueDate}
                    startDate={project.startDate}
                    endDate={project.endDate}
                    projectId={project._id}
                    setRefetchFlag={setRefetchFlag}
                  />
                </li>
              ))}
            </ul>
          )}
          <div className='mt-6'>
            <div className='w-full max-w-2xl mx-auto bg-background border shadow-md rounded-2xl p-6 space-y-4 transition-all duration-300'>
              <h2 className='text-xl font-semibold text-foreground mb-2'>
                Create New Project
              </h2>
              <div className='space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-4'>
                <div className='flex-1 space-y-2'>
                  <label
                    htmlFor='title'
                    className='block text-sm font-medium text-muted-foreground'
                  >
                    Project Title
                  </label>
                  <input
                    id='title'
                    type='text'
                    placeholder='Enter your project title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                  />
                </div>

                <div className='flex-1 space-y-2'>
                  <label
                    htmlFor='description'
                    className='block text-sm font-medium text-muted-foreground'
                  >
                    Project Description
                  </label>
                  <input
                    id='description'
                    type='text'
                    placeholder='Short description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddProject(title, description);
                      }
                    }}
                    className='w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                  />
                </div>
              </div>

              <button
                className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow transition-all duration-200'
                onClick={() => handleAddProject(title, description)}
              >
                <PlusIcon className='w-4 h-4' />
                Add Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
