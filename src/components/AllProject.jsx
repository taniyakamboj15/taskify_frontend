import React, { useState, useEffect } from "react";
import SubHeader from "./SubHeader";
import useUserAuth from "../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import useGetAllProjects from "../hooks/useGetAllProjects";
import { toast } from "react-toastify";
import { AddProjectTitle } from "../utils/addProject";
import { PlusIcon } from "lucide-react";
import ProjectCard from "./ProjectCard";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useSelector } from "react-redux";
const AllProjects = () => {
  const navigate = useNavigate();
  const { user, loading } = useUserAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [refetchFlag, setRefetchFlag] = useState(false);
  const allProjects = useSelector((state) => state.projects.projects);
  const { projectLoading } = useGetAllProjects(refetchFlag);
  const [filteredProjects, setFilteredProjects] = useState(allProjects);
  const [isFiltered, setIsFiltered] = useState(false);

  const projects = isFiltered ? filteredProjects : allProjects;

  useEffect(() => {
    setFilteredProjects(allProjects);
  }, [allProjects]);

  const handleFilter = ({ priority, status }) => {
    setIsFiltered((prev) => !prev);
    const filtered = allProjects.filter((project) => {
      const matchPriority =
        priority === "all" ||
        project.priority.toLowerCase() === priority.toLowerCase();
      const matchStatus =
        status === "all" ||
        project.status.toLowerCase() === status.toLowerCase();
      return matchPriority && matchStatus;
    });
    setFilteredProjects(filtered);
  };

  const handleExport = (format) => {
    if (format === "json") {
      const blob = new Blob([JSON.stringify(filteredProjects, null, 2)], {
        type: "application/json",
      });
      saveAs(blob, "projects_export.json");
    } else if (format === "pdf") {
      const doc = new jsPDF();
      let y = 10;

      doc.setFontSize(16);
      doc.text("Project List", 14, y);
      y += 10;

      filteredProjects.forEach((project, idx) => {
        doc.setFontSize(14);
        doc.text(`${idx + 1}. ${project.name}`, 14, y);
        y += 8;

        doc.setFontSize(11);
        doc.text(`Description: ${project.description || "—"}`, 14, y);
        y += 6;

        doc.text(`Status: ${project.status}`, 14, y);
        y += 6;

        doc.text(`Priority: ${project.priority}`, 14, y);
        y += 6;

        doc.text(
          `Start Date: ${
            project.startDate
              ? new Date(project.startDate).toLocaleDateString()
              : "—"
          }`,
          14,
          y
        );
        y += 6;

        doc.text(
          `End Date: ${
            project.dueDate
              ? new Date(project.dueDate).toLocaleDateString()
              : "—"
          }`,
          14,
          y
        );
        y += 8;

        if (project.tasks && project.tasks.length > 0) {
          doc.setFontSize(12);
          doc.text("Tasks:", 14, y);
          y += 4;

          const taskTableData = project.tasks.map((task, tIdx) => [
            tIdx + 1,
            task.title,
            task.status,
            task.priority,
            task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—",
          ]);

          doc.autoTable({
            head: [["#", "Title", "Status", "Priority", "Due Date"]],
            body: taskTableData,
            startY: y,
            styles: { fontSize: 10 },
            theme: "striped",
            margin: { left: 14, right: 14 },
          });

          y = doc.autoTable.previous.finalY + 4;
        }
        {
          doc.setFontSize(8);
          doc.text(
            `Created On: ${
              project.createdAt
                ? new Date(project.createdAt).toLocaleDateString()
                : "- "
            }`,
            14,
            y
          );
          y += 8;
        }
        {
          doc.setFontSize(8);
          doc.text(
            `Last Updated: ${
              project.updatedAt
                ? new Date(project.updatedAt).toLocaleDateString()
                : "- "
            }`,
            14,
            y
          );
          y += 8;
        }

        if (project.comment) {
          doc.setFontSize(11);
          doc.text(`Comment: ${project.comment}`, 14, y);
          y += 8;
        }

        // Add page break if needed
        if (y > 260) {
          doc.addPage();
          y = 10;
        }
      });

      doc.save("projects_export.pdf");
    }
  };

  useEffect(() => {
    if (!loading && !user) {
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
      <SubHeader
        text='My Projects'
        onFilter={handleFilter}
        onExport={handleExport}
      />
      <div className='flex flex-col gap-4 p-4'>
        {isFiltered && projects.length > 0 && (
          <p className='text-sm text-indigo-500 font-medium px-1 mb-2'>
            Showing filtered projects
          </p>
        )}

        {projects.length === 0 ? (
          <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-4'>
            <p className='text-gray-500 dark:text-gray-400'>
              {isFiltered
                ? "No projects match the current filter."
                : "No Projects added yet – let’s get started! Add your first Project and take a step toward productivity!"}
            </p>
          </div>
        ) : (
          <div className='pl-1 md:pl-5'>
            {projects.map((project) => (
              <div
                key={project._id}
                className='text-gray-700 dark:text-gray-300 mt-2 pt-2'
              >
                <ProjectCard
                  title={project.name}
                  description={project.description}
                  comment={project.comment}
                  status={project.status}
                  priority={project.priority}
                  projects={project.projects}
                  dueDate={project.dueDate}
                  startDate={project.startDate}
                  endDate={project.endDate}
                  projectId={project._id}
                  setRefetchFlag={setRefetchFlag}
                  tasks={project.tasks}
                />
              </div>
            ))}
          </div>
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
                  required={true}
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
                  required={true}
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
  );
};

export default AllProjects;
