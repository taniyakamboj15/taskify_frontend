import { useDispatch, useSelector } from "react-redux";
import { addTasks } from "../redux/tasksSlice";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const useGetAllTask = (refetchFlag) => {
  const [taskloading, setTaskLoading] = useState(false);
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const getAllTask = async () => {
    try {
      setTaskLoading(true);
      const response = await fetch(`${BASE_URL}get/tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      dispatch(addTasks(data.data));
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    } finally {
      setTaskLoading(false);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await getAllTask();
      } catch (error) {
        console.error("Error in useGetAllTask:", error);
      }
    };
    fetchTasks();
  }, [refetchFlag]);

  return { tasks, taskloading };
};
export default useGetAllTask;
