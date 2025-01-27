import FAQSection from "@/app/course_components/components/FAQSection";
import Footer from "@/app/course_components/components/Footer";
// import Header from "@/components/Header";
import Path from "@/app/course_components/components/path";
import TestimonialsCarousel from "@/app/course_components/components/TestimonialsCarousel";
// import BootcampTopics from "@/components/sample";
import CardSection from "@/app/course_components/components/Card";
import Test from "@/app/course_components/components/test";
import EligibilityCriteria from "@/app/course_components/components/EligilityCriteria";
import Tools from "@/app/course_components/components/Tools";
import ScrollingCompany from "@/app/course_components/components/ScrollingComapany";
import FeatureAndRolesSection from "@/app/course_components/components/FeatureAndRolesSection";
import ScrollingImages from "@/app/course_components/components/ScrollingImages";
import CohortInfo from "@/app/course_components/components/CohortInfo";
import SessionForm from "@/app/course_components/components/SessionForm";
import MainHeader from "@/app/course_components/components/MainHeader";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setCookie } from "@/app/course_components/utils/cookies";

export interface CourseData {
    id: string;
    title: string;
    courseCode: string;
    description: string;
    courseContentDetails: string;
    metaDescription: string;
}

export default function Home() {
  const { slug } = useParams<{ slug: string }>();
  const [courseData, setCourseData] = useState<CourseData | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (slug) {
        try {
          const response = await fetch(`/api/courses/${slug}`);
          const data = await response.json();
          setCourseData(data);
          
          // Set a cookie with course title
          if (data.title) {
            setCookie('courseTitle', data.title, 7); // Cookie expires in 7 days
          }
        } catch (error) {
          console.error('Error fetching course data:', error);
        }
      }
    };

    fetchCourseData();
  }, [slug]);

  return (
      <main>
        <MainHeader />
        <div className="bg-gradient-to-r from-white to-blue-100 flex flex-col items-center justify-center p-6">
          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between space-y-10 lg:space-y-0 lg:space-x-10">
            <div className="lg:w-2/3 space-y-6">
            <Test courseData={courseData} />
            </div>
            <div className="lg:w-1/3 mt-10 lg:mt-0">
              <SessionForm />
            </div>
          </div>
        </div>

        {/* CohortInfo Section */}
        <div>
          <CohortInfo />
        </div>

        {/* Cards Section */}
        <div className="m-0 p-0">
          <CardSection />
        </div>

        {/* Small Space Between Sections */}
        <div className="mt-20"></div>

        {/* Scrolling Images Section */}
        <div className="m-0 p-[-15]">
          <ScrollingImages />
        </div>

        {/* Cloud Roles Rotating Section */}
        <div className="flex mt-4">
          <div className="flex-1 py-4 px-4">
            <FeatureAndRolesSection />
          </div>
        </div>

        {/* Add ScrollingCompany and CombinedComponent in Sequence */}
        <div className="mt-[-40]">
          <div className="m-0 p-0">
            <ScrollingCompany />
          </div>
          <div className="mt-[-10]">
            <Tools />    
          </div>
          <div className="mt-[-10]">
            <EligibilityCriteria />
            
          </div>
        </div>
        <Path courseData={courseData} />
        <FAQSection />
        <TestimonialsCarousel  />
        <Footer/>
      </main>
  );
}
