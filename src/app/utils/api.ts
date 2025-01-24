import axios from 'axios';

interface Partner {
  partnerId: number;
  partnerName: string;
}

interface CourseCategory {
  categoryName: string;
}

export interface CourseData {
  Partner?: Partner;
  CourseCategory?: CourseCategory;
  courseId: number;
  title: string;
  originalPrice: string;
  discountedPrice: string;
}

export const fetchCourses = async (): Promise<CourseData[]> => {
  const response = await fetch('http://stu.globalknowledgetech.com:5001/lms/course');
  const data = await response.json();
  return data.courses;
};

interface CertificationPartner {
  partnerId: number;
  partnerName: string;
}

interface CertificationCategory {
  categoryName: string;
}

export interface CertificationData {
  certificationId: number;
  certificateCourseId: number;
  slug: string;
  title: string;
  Partner?: CertificationPartner;
  CertificationCategory?: CertificationCategory;
  description?: string;
  duration?: string;
  level?: string;
}

export const fetchCertifications = async (): Promise<CertificationData[]> => {
  try {
    const response = await fetch('http://stu.globalknowledgetech.com:5001/lms/certificate-course', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response not OK:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Raw API response:', data); // Log the raw response

    // Check if data exists and has the expected structure
    if (!data || !Array.isArray(data.certificateCourses)) {
      console.error('API response does not contain an array of certificateCourses:', data);
      return [];
    }

    return data.certificateCourses; // Return the certificateCourses array
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return [];
  }
};

export const fetchCoursesByPartner = async () => {
  try {
    const response = await fetch('http://stu.globalknowledgetech.com:5001/lms/course');
    const data = await response.json();
    
    // Group courses by partner
    const groupedCourses = data.courses.reduce((acc: Record<string, CourseData[]>, course: CourseData) => {
      const partnerName = course.Partner?.partnerName || 'Other';
      if (!acc[partnerName]) {
        acc[partnerName] = [];
      }
      acc[partnerName].push(course);
      return acc;
    }, {});

    return groupedCourses;
  } catch (error) {
    console.error('Error fetching courses by partner:', error);
    return {};
  }
};

const axiosPublic = axios.create({
  baseURL: "http://stu.globalknowledgetech.com:5001",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Course {
    courseId: number;
    title: string;
    description: string;
    slug: string;
}

export interface CertificateCourseItem {
    certificateCourseItemId: number;
    courseId: number;
    Course: Course;
}

export interface CertificateCourseCostPlan {
    certificateCourseCostPlanId: number;
    certificateCourseId: number;
    CertificateCourseItems: CertificateCourseItem[];
}

export interface CertificateData {
    title: string;
    description: string | null;
    CertificateCourseCostPlans: CertificateCourseCostPlan[];
}

export const fetchCertificateBySlug = async (slug: string): Promise<CertificateData> => {
    const response = await axiosPublic.get("/lms/certificate-course", {
        params: {
            slug: slug
        }
    });
    console.log('API Response:', response.data);
    return response.data.certificateCourses[0];
};
