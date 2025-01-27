"use client";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Breadcrumb from "./components/BreadCrumb/breadcrumb";
import Sidebar from "./components/Sidebar/Sidebar";
import CourseCard from "./components/CourseCard/CourseCard";
import AIWheel from './components/AIWheel/AIWheel';
import CourseNav from "./components/CourseNav/CourseNav";
import Certifications from './components/Certifications/MainCertifications';
import Footer from './components/Footer/Footer';
import { useCourseManagement } from "@/app/hooks/useCourseManagement";
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import SubCertificate from './components/Certifications/SubCertificate';
// import FAQSection from "@/app/course_components/components/FAQSection";
// import Path from "@/app/course_components/components/path";
// import TestimonialsCarousel from "@/app/course_components/components/TestimonialsCarousel";
// import CardSection from "@/app/course_components/components/Card";
// import Test from "@/app/course_components/components/test";
// import EligibilityCriteria from "@/app/course_components/components/EligilityCriteria";
// import Tools from "@/app/course_components/components/Tools";
// import ScrollingCompany from "@/app/course_components/components/ScrollingComapany";
// import FeatureAndRolesSection from "@/app/course_components/components/FeatureAndRolesSection";
// import ScrollingImages from "@/app/course_components/components/ScrollingImages";
// import CohortInfo from "@/app/course_components/components/CohortInfo";
// import SessionForm from "@/app/course_components/components/SessionForm";
// import MainHeader from "@/app/course_components/components/MainHeader";
import { setMultipleCookies } from "@/app/course_components/utils/cookies";

export interface CourseData {
    id: string;
    title: string;
    courseCode: string;
    description: string;
    courseContentDetails: string;
    metaDescription: string;
}

export default function Home() {
  const {
    courses,
    displayedCourses,
    handleLoadMore,
    handleFilter,
    handleSearch,
    hasMore
  } = useCourseManagement(9);
  
  const [activeTab, setActiveTab] = useState<'courses' | 'certifications'>('courses');
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    const fetchCourseData = async () => {
      if (slug) {
        try {
          const response = await fetch(`/api/courses/${slug}`);
          const data = await response.json();
          
          // Set multiple cookies
          const cookiesToSet = {
            cookieId: 'unique-cookie-id', // Replace with actual ID
            createdAt: new Date().toISOString(),
            endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
            startTime: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            visited_course: data.title || 'Unknown Course',
            visited_course_time: new Date().toISOString(),
            message: "Cookie created successfully"
          };
          setMultipleCookies(cookiesToSet, 7); // Set cookies to expire in 7 days

          // Print message to console
          console.log(cookiesToSet.message);
        } catch (error) {
          console.error('Error fetching course data:', error);
        }
      }
    };

    fetchCourseData();
  }, [slug]);

  return (
    <Router>
      <Routes>
        <Route path="/certifications/:slug" element={<SubCertificate />} />
        <Route path="/" element={
          <div className="min-h-screen bg-gray-900">
            <Header />
            <main className="pt-[120px]">
              <Breadcrumb />
              
              <section className="py-16">
                <AIWheel />
              </section>

              <div className="container mx-auto px-4 py-8">
                <CourseNav 
                  activeTab={activeTab} 
                  onTabChange={setActiveTab}
                />
                
                {activeTab === 'courses' ? (
                  <div className="flex flex-col lg:flex-row gap-8">
                    <aside className="lg:w-1/4">
                      <Sidebar 
                        onFilter={handleFilter} 
                        courses={courses} 
                        onSearch={handleSearch}
                      />
                    </aside>
                    <main className="lg:w-3/4">
                      <CourseCard 
                        courses={displayedCourses} 
                        onLoadMore={handleLoadMore}
                        hasMore={hasMore}
                      />
                    </main>
                  </div>
                ) : (
                  <Certifications />
                )}
              </div>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}
