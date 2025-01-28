"use client";
import React, { useState, useEffect } from "react";
import axios, { AxiosInstance } from "axios";

type Section = {
  name: string;
  subtitle: string;
};

type PathProps = {
  slugname: string | string[] | undefined;
};

const Path: React.FC<PathProps> = ({ slugname }) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const axiosPublic: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://stu.globalknowledgetech.com:5001",
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!slugname) {
        setError("No course slug provided");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axiosPublic.get("/lms/course-details", {
          params: { slug: slugname },
        });

        console.log("Full API Response:", response.data);

        const modules =
          response.data?.courses?.[0]?.CourseContent?.courseContent?.course?.courseDetails?.content?.modules || [];

        if (!Array.isArray(modules) || modules.length === 0) {
          setError("No modules found in course content");
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const processedSections = modules.map((module: any) => ({
          name: module.name?.trim() || "Untitled Module",
          subtitle: module.name?.trim() || "Untitled Module",
        }));

        setSections(processedSections);
      } catch (err) {
        console.error("Error fetching course data:", err);
        setError("Failed to fetch course data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [slugname]);

  const TimelineItem: React.FC<{ section: Section; isActive: boolean; onClick: () => void }> = ({
    section,
    isActive,
    onClick,
  }) => (
    <li
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-300 ${
        isActive ? "text-blue-900 bg-blue-100 rounded-lg p-4" : "text-gray-800"
      }`}
    >
      <div
        className={`absolute left-[-14px] h-2 w-2 rounded-full top-5 transition-all duration-300 ${
          isActive ? "bg-blue-500" : "bg-gray-400"
        }`}
      />
      <div className="ml-10 flex flex-col space-y-2">
        <span
          className={`text-base font-semibold transition-all duration-300 ${
            isActive ? "text-blue-900" : "text-gray-800 hover:text-blue-500"
          }`}
        >
          {section.name}
        </span>
        {isActive && <span className="text-sm text-gray-600">{section.subtitle}</span>}
      </div>
    </li>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-blue-900 mb-10">
        Things You Will Learn In This Bootcamp!
      </h2>

      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto gap-8 p-4">
        <div className="flex-1 bg-white shadow-md rounded-lg p-6">
          <div className="relative">
            <div className="absolute left-2 top-0 h-full w-0.5 bg-blue-500" />
            {error ? (
              <div className="text-red-500 text-center p-4">{error}</div>
            ) : (
              <ul className="relative space-y-8 pl-6">
                {sections.map((section, idx) => (
                  <TimelineItem
                    key={idx}
                    section={section}
                    isActive={activeIndex === idx}
                    onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <h3 className="text-lg font-bold text-blue-500 mb-4">Contact Us</h3>
            <p className="text-gray-800 font-semibold text-xl">+91 89700 07858</p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg">
            <h4 className="rainbow-gradient-text font-semibold text-center mb-6 text-lg">
              TALK TO OUR CAREER CONSULTANT
            </h4>
            <form className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Complete Name"
                  className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 py-1 placeholder-gray-500 text-blue-500"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 py-1 placeholder-gray-500 text-blue-500"
                />
              </div>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+91 Number"
                  className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 py-1 placeholder-gray-500 text-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
        
      <style jsx>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }

        .rainbow-gradient-text {
          background-image: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet);
          background-size: 200% 100%;
          background-clip: text;
          color: transparent;
          animation: gradientAnimation 3s linear infinite;
        }
      `}</style>

    </div>
  );
};

export default Path;
