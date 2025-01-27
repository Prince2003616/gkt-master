"use client";
import { useEffect, useState } from "react";
import { fetchCourseDetails } from "@/app/course_components/utils/api";
import Image from "next/image";

// Define the CourseData interface
interface CourseData {
    id: string;
    title: string;
    courseCode: string;
    description: string;
    courseContentDetails: string;
    metaDescription: string;
}

interface TestProps {
    courseData: CourseData | null; // Accept courseData as a prop
}

const Test: React.FC<TestProps> = ({ courseData }) => {
    const [userCourse, setUserInfo] = useState<CourseData[]>([]); // Use CourseData type

    useEffect(() => {
        const getData = async () => {
            if (courseData) {
                setUserInfo([courseData]); // Set userCourse based on courseData
            } else {
                const courses = await fetchCourseDetails("prompt-engineering-for-gen-ai");
                setUserInfo(courses);
            }
        };
        getData();
    }, [courseData]);

    return (
        <div>
            <div className="text-left">
                {userCourse.length > 0 &&
                    userCourse.map((user, index) => (
                        <div key={user.id || index}>
                            <h1 className="text-4xl font-bold text-gray-900 mt-10 mb-6 px-6">
                                {user.title}
                            </h1>
                            <h3 className="px-6">
                                <span className="font-semibold">CourseCode: </span>
                                {user.courseCode}
                            </h3>
                            <p className="text-lg mt-4 max-w-3xl text-gray-900 content-left mb-4 px-6">
                                {user.description}
                            </p>
                            <li className="test-base max-w-2xl px-6 mb-4">{user.courseContentDetails}</li>
                            <li className="test-base max-w-2xl px-6 mb-4">{user.metaDescription}</li>
                        </div>
                    ))}
            </div>
            <div className="flex items-center space-x-3 px-6">
                <Image src="/cloud.jpg" alt="cloud certificate logo" width={45} height={45} />
                <span className="text-xl font-semibold text-gray-800">Certified by</span>
                <Image src="/google.svg" alt="Google logo" width={120} height={100} />
            </div>
            <div className="mt-4 space-x-4 px-6">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow">
                    ENROLL 🎓
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow">
                    PROGRAM SYLLABUS 📘
                </button>
            </div>
        </div>
    );
};

export default Test;
