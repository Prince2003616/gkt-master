"use client";
import { useState } from "react";
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
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SubCertificate from './components/Certifications/SubCertificate';

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
