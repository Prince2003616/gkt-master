"use client";
import React, { useEffect, useState } from "react";
import { FiCloud } from "react-icons/fi";
import { FaUserGraduate } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

// Audience data
const audienceData = [
  {
    title: "IT Professionals",
    description: "Who want to learn more about cloud computing.",
    icon: <FiCloud className="text-white w-6 h-6 shadow-xl" />,
  },
  {
    title: "Beginners",
    description: "Who want to start a career in cloud computing.",
    icon: <FaUserGraduate className="text-white w-6 h-6 shadow-xl" />,
  },
  {
    title: "Anyone Interested",
    description: "In learning about Google Cloud and its features.",
    icon: <FcGoogle className="w-6 h-6 shadow-xl" />,
  },
];

// Audience Card Component
interface AudienceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isVisible: boolean;
}

const AudienceCard: React.FC<AudienceProps> = ({ title, description, icon, isVisible }) => (
  <div
    className={`relative bg-white shadow-md rounded-lg p-4 transition-transform duration-700 ${
      isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
    }`}
  >
    <div className="absolute -top-6 left-4 bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-full shadow-lg">
      <div className="shadow-xl">{icon}</div>
    </div>
    <div className="mt-6">
      <h3 className="text-black text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

// Main Component
const EligibilityCriteria: React.FC = () => {
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;

      const newVisibleIndices: number[] = [];
      audienceData.forEach((_, index) => {
        const element = document.getElementById(`audience-card-${index}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top + window.scrollY < scrollPosition) {
            newVisibleIndices.push(index);
          }
        }
      });
      setVisibleIndices(newVisibleIndices);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setVisibleIndices([]); // Reset visibility on refresh
  }, []);

  return (
    <div className="bg-gray-900 text-white py-8 px-6">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-3xl font-bold text-left mb-10">Eligibility Criteria</h2>
        <div className="space-y-6">
          {audienceData.map((audience, index) => (
            <div
              id={`audience-card-${index}`}
              key={index}
              className="flex flex-col items-start"
            >
              <AudienceCard
                title={audience.title}
                description={audience.description}
                icon={audience.icon}
                isVisible={visibleIndices.includes(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EligibilityCriteria;
