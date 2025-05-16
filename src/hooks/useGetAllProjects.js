import { useDispatch, useSelector } from "react-redux";
import { addProjects } from "../redux/projectSlice";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const useGetAllProjects = (refetchFlag) => {
  const [projectloading, setprojectLoading] = useState(false);
  const projects = useSelector((state) => state.projects.projects);
  const dispatch = useDispatch();
  const getAllProjects = async () => {
    try {
      setprojectLoading(true);
      const response = await fetch(`${BASE_URL}get/projects`, {
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

      dispatch(addProjects(data.data));
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    } finally {
      setprojectLoading(false);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        await getAllProjects();
      } catch (error) {
        console.error("Error in useGetAllProjects:", error);
      }
    };
    fetchProjects();
  }, [refetchFlag]);

  return { projects, projectloading };
};
export default useGetAllProjects;
