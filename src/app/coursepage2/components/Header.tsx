"use client";
import { useEffect, useState } from "react";
import axios, {AxiosInstance} from "axios";
import Image from "next/image";

interface CourseData {
    id: string;
    title: string;
    courseCode: string;
    description: string;
    courseContentDetails: string;
    metaDescription: string;
}

interface TestProps {
    slugname: string | undefined;
}

const Test: React.FC<TestProps> = ({ slugname }) => {
    const [userCourse, setUserCourse] = useState<CourseData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourseDetails = async (slug: string) => {
            const axiosPublic: AxiosInstance = axios.create({
                baseURL: process.env.NEXT_PUBLIC_API_URL || "http://stu.globalknowledgetech.com:5001",
                headers: {
                  "Content-Type": "application/json",
                },
              });

            try {
                const response = await axiosPublic.get("/lms/course-details", {
                    params: { slug },
                });

                // Assuming the API response is either an object or an array
                const courseData = Array.isArray(response.data) ? response.data : [response.data];

                if (courseData.length > 0) {
                    setUserCourse(courseData);
                } else {
                    setError("No course found with the given slug.");
                }
            } catch (err) {
                console.error("Error fetching course details:", err);
                setError("An error occurred while fetching course details.");
            } finally {
                setLoading(false);
            }
        };

        if (slugname) {
            fetchCourseDetails(slugname);
        } else {
            setError("Invalid slugname.");
            setLoading(false);
        }
    }, [slugname]);

    if (loading) {
        return <div className="text-center py-10">Loading course details...</div>;
    }

    if (error) {
        return <div className="text-center py-10">{error}</div>;
    }

    return (
        <div>
            <div className="text-left">
                {userCourse.map((user, index) => (
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
                        <li className="text-base max-w-2xl px-6 mb-4">{user.courseContentDetails}</li>
                        <li className="text-base max-w-2xl px-6 mb-4">{user.metaDescription}</li>
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
