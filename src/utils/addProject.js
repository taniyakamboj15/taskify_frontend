import { toast } from "react-toastify";
import { BASE_URL } from "./constants";

// Helper function to send POST requests
const sendProjectRequest = async ({
  url,
  payload,
  successMessage,
  setRefetchFlag,
}) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Something went wrong");

    setRefetchFlag?.((prev) => !prev);
    if (successMessage)
      toast.success(successMessage, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    return data;
  } catch (error) {
    toast.error(error.message || "Something went wrong");
    throw error;
  }
};

// Add new project
export const AddProjectTitle = async ({
  title,
  description,
  setRefetchFlag,
}) => {
  if (!title || !description)
    throw new Error("Project title and description are required");
  if (title.length < 3 || description.length < 15)
    throw new Error("Title or description too short");

  return await sendProjectRequest({
    url: "upload/project",
    payload: { name: title, description },
    setRefetchFlag,
  });
};

// Add comment to project
export const AddProjectComment = async ({
  projectId,
  comment,
  setRefetchFlag,
}) => {
  if (!projectId || !comment)
    throw new Error("Project ID and comment are required");

  return await sendProjectRequest({
    url: "update/Project",
    payload: { projectId, comment },
    setRefetchFlag,
    successMessage: "Comment Added",
  });
};

// Change project status
export const ChangeProjectStatus = async ({
  projectId,
  status,
  setRefetchFlag,
}) => {
  if (!projectId || !status)
    throw new Error("Project ID and status are required");

  return await sendProjectRequest({
    url: "update/Project",
    payload: { projectId, status },
    setRefetchFlag,
    successMessage: "Status updated",
  });
};

// Add due date
export const AddProjectDueDate = async ({
  projectId,
  dueDate,
  setRefetchFlag,
}) => {
  if (!projectId || !dueDate)
    throw new Error("Project ID and due date are required");
  return await sendProjectRequest({
    url: "update/Project",
    payload: { projectId, dueDate },
    setRefetchFlag,
    successMessage: "Due date updated",
  });
};

// Change priority
export const ChangeProjectPriority = async ({
  projectId,
  priority,
  setRefetchFlag,
}) => {
  if (!projectId || !priority)
    throw new Error("Project ID and priority are required");

  return await sendProjectRequest({
    url: "update/Project",
    payload: { projectId, priority },
    setRefetchFlag,
    successMessage: "Priority updated",
  });
};

// Update start date
export const UpdateProjectStartDate = async ({
  projectId,
  startDate,
  setRefetchFlag,
}) => {
  if (!projectId || !startDate)
    throw new Error("Project ID and start date are required");

  return await sendProjectRequest({
    url: "update/Project",
    payload: { projectId, startDate },
    setRefetchFlag,
    successMessage: "Start date updated",
  });
};

// Update end date
export const UpdateProjectEndDate = async ({
  projectId,
  endDate,
  setRefetchFlag,
}) => {
  if (!projectId || !endDate)
    throw new Error("Project ID and end date are required");

  return await sendProjectRequest({
    url: "update/Project",
    payload: { projectId, endDate },
    setRefetchFlag,
    successMessage: "End date updated",
  });
};

// Delete project
export const DeleteProject = async ({ projectId, setRefetchFlag }) => {
  if (!projectId) throw new Error("Project ID is required");

  return await sendProjectRequest({
    url: `delete/project/${projectId}`,
    payload: {},
    setRefetchFlag,
    successMessage: "Project deleted",
  });
};
