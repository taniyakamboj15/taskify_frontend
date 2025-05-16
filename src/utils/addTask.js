import { toast } from "react-toastify";
import { BASE_URL } from "./constants";

export const addTaskTitle = async ({ title }) => {
  try {
    if (!title) {
      throw new Error("Title is required");
    }
    if (title.length < 3) {
      throw new Error("Title must be at least 3 characters long");
    }
    const res = await fetch(`${BASE_URL}upload/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title }),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.msg || "Failed to add task");

    return data;
  } catch (error) {
    console.error("Error adding task:", error.message);
    throw error;
  }
};
export const addTaskComment = async ({ taskId, comment, setRefetchFlag }) => {
  try {
    if (!taskId || !comment) {
      throw new Error("Task ID and comment are required");
    }
    const res = await fetch(`${BASE_URL}update/Task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ taskId, comment }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Failed to add comment");
    setRefetchFlag();
    if (res.ok) {
      toast.success("Comment Added", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
    return data;
  } catch (error) {
    console.error("Error adding comment:", error.message);
    throw error;
  }
};
{
  /* mark staus as done*/
}
export const changeTaskStatus = async ({ taskId, status, setRefetchFlag }) => {
  try {
    if (!taskId || !status) {
      throw new Error("Task ID and status are required");
    }
    const res = await fetch(`${BASE_URL}update/Task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ taskId, status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Failed to add comment");
    setRefetchFlag();
    if (res.ok) {
      toast.success("status updated", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
    return data;
  } catch (error) {
    console.error("Error adding status:", error.message);
    throw error;
  }
};
export const addTaskDueDate = async ({ taskId, dueDate, setRefetchFlag }) => {
  try {
    if (!taskId || !dueDate) {
      throw new Error("Task ID and date are required");
    }
    const res = await fetch(`${BASE_URL}update/Task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ taskId, dueDate }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Failed to add comment");
    if (res.ok) {
      toast.success("Due date updated", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
    setRefetchFlag();
    return data;
  } catch (error) {
    console.error("Error adding duedate:", error.message);
    throw error;
  }
};
export const changeTaskPriority = async ({
  taskId,
  priority,
  setRefetchFlag,
}) => {
  try {
    console.log("i am called", taskId);
    if (!taskId || !priority) {
      throw new Error("Task ID and priority are required");
    }
    const res = await fetch(`${BASE_URL}update/Task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ taskId, priority }),
    });
    const data = await res.json();
    console.log("data", data);
    if (!res.ok) throw new Error(data.msg || "Failed to ");
    if (res.ok) {
      toast.success("Priority Changed", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
    setRefetchFlag();
    return data;
  } catch (error) {
    console.error("Error adding priority:", error.message);
    throw error;
  }
};
export const deleteTask = async ({ taskId, setRefetchFlag }) => {
  try {
    if (!taskId) {
      throw new Error("Task ID is required");
    }
    const res = await fetch(`${BASE_URL}delete/task/${taskId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Failed to delete comment");
    setRefetchFlag();
    if (res.ok) {
      toast.success("Task Deleted", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }

    return data;
  } catch (error) {
    toast.error("Failed to delete");
    throw error;
  }
};
//utils/addTask.js
export const addProjectTaskTitle = async ({ title, projectId }) => {
  try {
    if (!title) {
      throw new Error("Title is required");
    }
    if (title.length < 3) {
      throw new Error("Title must be at least 3 characters long");
    }
    const res = await fetch(`${BASE_URL}upload/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title, projectId }),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.msg || "Failed to add task");
    if (res.ok) {
      toast.success("Task Added", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
    return data;
  } catch (error) {
    throw error;
  }
};
