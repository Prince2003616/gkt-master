import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://stu.globalknowledgetech.com:5001",
});

export const fetchCourseDetails = async (slug: string) => {
  try {
    const response = await axiosPublic.get("/lms/course-details", {
      params: { slug },
    });
    return response.data.courses;
  } catch (error) {
    console.error("Error fetching course details:", error);
    return [];
  }
};
