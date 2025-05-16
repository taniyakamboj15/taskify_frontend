import React, { useState, useEffect } from "react";
import SubHeader from "./SubHeader";
import ProjectCard from "./ProjectCard";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";

const Dashboard = () => {
  const allProjects = useSelector((state) => state.projects.projects);
  const [filteredProjects, setFilteredProjects] = useState(allProjects);

  useEffect(() => {
    setFilteredProjects(allProjects);
  }, [allProjects]);

  const handleFilter = ({ priority, status }) => {
    const filtered = allProjects.filter((project) => {
      const matchPriority = priority === "all" || project.priority === priority;
      const matchStatus = status === "all" || project.status === status;
      return matchPriority && matchStatus;
    });
    setFilteredProjects(filtered);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(filteredProjects, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "projects_export.json");
  };

  return (
    <div>
      <SubHeader
        text='My Projects'
        onFilter={handleFilter}
        onExport={handleExport}
      />
      <div className='p-4'>
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project._id}
            {...project}
            setRefetchFlag={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
