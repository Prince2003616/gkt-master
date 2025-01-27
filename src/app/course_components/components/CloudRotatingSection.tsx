"use client";
import React, { useState, useEffect } from "react";
import { CiCloudOn } from "react-icons/ci";

interface Job {
  title: string;
  salary: string;
}

const jobs: Job[] = [
  { title: "Cloud DevOps Engineer", salary: "3.6-18LPA" },
  { title: "Cloud Support Associate", salary: "3-14LPA" },
  { title: "Junior Cloud Engineer", salary: "1.8-8LPA" },
  { title: "Cloud Infrastructure Engineer", salary: "2-10LPA" },
  { title: "Cloud Operations Analyst", salary: "4-11.5LPA" },
  { title: "Cloud Systems Administrator", salary: "3.4-16LPA" },

];

const RotatingCards: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Automatic rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % jobs.length);
    }, 3000); // Rotate every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 overflow-hidden relative bg-gray-150">
      {jobs.map((job, index) => {
        const isActive = index === activeIndex;
        const isPrev = index === (activeIndex - 1 + jobs.length) % jobs.length;
        const isNext = index === (activeIndex + 1) % jobs.length;

        return (
          <div
            key={index}
            className={`absolute w-80 rounded-2xl p-6 pl-16 text-left transform transition-all duration-700 ease-in-out shadow-lg
              ${isActive ? "scale-100 bg-white z-10" : "scale-95 blur-[1px] bg-gray-200"}
              ${isPrev ? "-translate-y-28 -z-0" : ""}
              ${isNext ? "translate-y-28 -z-0" : ""}
            `}
          >
            {/* Black Circle overlapping the left */}
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-black rounded-full w-16 h-16 shadow-md">
              <CiCloudOn size={30} color="white" />
            </div>

            {/* Job Title */}
            <h2 className="font-bold text-lg text-blue-600">{job.title}</h2>

            {/* Job Salary */}
            <p className="text-sm font-medium text-gray-700">
              Avg Salary - {job.salary}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default RotatingCards;
