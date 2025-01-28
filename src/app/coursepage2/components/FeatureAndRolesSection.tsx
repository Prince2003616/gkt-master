"use client";

import React, { useState, useEffect, useRef } from "react";
import { CiCloudOn } from "react-icons/ci";
import {
  FaUsers,
  FaLaptop,
  FaFileAlt,
  FaChalkboardTeacher,
  FaClock,
  FaUserTie,
} from "react-icons/fa";
import { JSX } from "react";

// Key Features Data
interface Feature {
  icon: JSX.Element;
  text: string;
}

const keyFeatures: Feature[] = [
  { icon: <FaUsers />, text: "Limited Batch Size" },
  { icon: <FaLaptop />, text: "Lab Access" },
  { icon: <FaFileAlt />, text: "Exam Vouchers" },
  { icon: <FaChalkboardTeacher />, text: "Live Training" },
  { icon: <FaClock />, text: "Quick Program" },
  { icon: <FaUserTie />, text: "Job Assistance" },
];

// Job Roles Data
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

// KeyFeatures Component
const KeyFeatures: React.FC = () => {
  const [visible, setVisible] = useState<boolean[]>(new Array(keyFeatures.length).fill(false));
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const index = featureRefs.current.indexOf(entry.target as HTMLDivElement);
      if (entry.isIntersecting) {
        setVisible((prev) => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
    featureRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex-1 p-6 space-y-8">
      <h1
        className={`text-4xl font-bold text-gray-800 transform transition-all duration-700 ease-in-out ${
          visible[0] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`}
      >
        Key Features & Impact
      </h1>
      <div className="text-left">
        <p
          className={`text-xl text-gray-600 max-w-2xl transform transition-all duration-700 ease-in-out ${
            visible[0] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
        >
          Learn from industry experts and experienced educators who are passionate about sharing their knowledge. Our instructors ensure you
          receive high-quality education. Access your courses 24/7, from anywhere.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {keyFeatures.map((feature, index) => (
          <div
            key={index}
            ref={(el) => { featureRefs.current[index] = el; }}
            className={`flex items-center space-x-6 transform transition-all duration-700 ease-in-out ${
              visible[index] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            <div className="text-blue-500 text-5xl">{feature.icon}</div>
            <p className="text-gray-800 font-semibold">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// RotatingCards Component
const RotatingCards: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % jobs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-md h-96 p-10 py-36">
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
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 flex items-center justify-center bg-black rounded-full w-16 h-16 shadow-md">
              <CiCloudOn size={30} color="white" />
            </div>
            <h2 className="font-bold text-sm text-blue-600">{job.title}</h2>
            <p className="text-sm font-medium text-gray-700">
              Avg Salary - {job.salary}
            </p>
          </div>
        );
      })}
    </div>
  );
};

// FeatureAndRolesSection Component
const FeatureAndRolesSection: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="flex-1">
        <KeyFeatures />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <RotatingCards />
      </div>
    </div>
  );
};

export default FeatureAndRolesSection;
