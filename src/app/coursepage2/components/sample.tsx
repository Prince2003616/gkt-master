'use client';

// Define the structure of the course data
interface Subtopic {
  title: string;
  subtopics?: string[];
}

export async function fetchCourseData(): Promise<Subtopic[]> {
  const response = await fetch("http://stu.globalknowledgetech.com:5001/lms/course");
  if (!response.ok) {
    throw new Error("Failed to fetch course data");
  }
  const data = await response.json();
  return Array.isArray(data) ? data : []; // Ensure it returns an array
}

import { useEffect, useState } from "react";

const BootcampTopics: React.FC = () => {
  const [courseData, setCourseData] = useState<Subtopic[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCourseData();
        setCourseData(data); // Assuming data is an array of topics
      } catch (err) {
        setError((err as Error).message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-start bg-gray-50 min-h-screen p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Things You Will Learn In This Bootcamp!
        </h1>
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <ul className="space-y-4">
            {courseData.map((topic, index) => (
              <li key={index} className="border-l-4 border-blue-500 pl-4">
                <h2 className="text-xl font-semibold text-gray-700">{topic.title}</h2>
                {topic.subtopics && topic.subtopics.length > 0 && (
                  <ul className="list-disc list-inside mt-2 text-gray-600">
                    {topic.subtopics.map((sub, idx) => (
                      <li key={idx}>{sub}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BootcampTopics;
