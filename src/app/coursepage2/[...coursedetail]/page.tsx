"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';
import { usePathname } from "next/navigation";
import CardSection from "../components/Card";
import CohortInfo from "../components/CohortInfo";
import EligibilityCriteria from "../components/EligibilityCriteria";
import FAQSection from "../components/FAQSection";
import FeatureAndRolesSection from "../components/FeatureAndRolesSection";
import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import Path from "../components/path";
import ScrollingCompany from "../components/ScrollingCompany";
import ScrollingImages from "../components/ScrollingImages";
import SessionForm from "../components/SessionForm";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import Tools from "../components/Tools";
import Header from "../components/Header";



export interface CourseData {
    id: string;
    title: string;
    courseCode: string;
    description: string;
    courseContentDetails: string;
    metaDescription: string;
}

export interface PathProps {
  courseData: CourseData | null;
}


export default function Home() {
    const pathname = usePathname();
    const slug = pathname.split("/").pop();
    const [courseData, setCourseData] = useState<CourseData | null>(null);

  const axiosPublic = axios.create({
    baseURL: "http://stu.globalknowledgetech.com:5002",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  useEffect(() => {
    console.log("Coursepage");
    
    console.log(slug);
    const fetchCourseData = async () => {
      if (slug) {
        try {
          const response = await axiosPublic.get("/lms/course-details", {
            params: {
                slug: slug
            }
        });          
          const data = await response.data;
          console.log(data);
          setCourseData(data);
        } catch (error) {
          console.error('Error fetching course data:', error);
        }
      }
    };

    fetchCourseData();
  }, []);

  return (
      <main className="bg-white">
        <MainHeader />
        <div className="bg-gradient-to-r from-white to-blue-100 flex flex-col items-center justify-center p-6">
          <div className="container mx-auto h-full flex flex-col lg:flex-row items-center justify-between space-y-10 lg:space-y-0 lg:space-x-10">
            <div className="lg:w-2/3 space-y-6 text-black">
            <Header slugname={slug} />
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
        <div className="m-0 p-[-15] bg-white">
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
            <Tools />    
          </div>
          <div className="mt-[-10]">
            <EligibilityCriteria />
          </div>
        </div>
        <Path slugname={slug}/>
        <FAQSection />
        <TestimonialsCarousel  />
        <Footer/>
      </main>
  );
}
