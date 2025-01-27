import Header from "./Header"; // Ensure 'Header.tsx' exists and is correctly exported
import React from 'react';
import Path from "./path";
import Footer from "./Footer";
import FAQSection from "./FAQSection";
import TestimonialsCarousel from "./TestimonialsCarousel";
import RotatingCards from "./RotatingCards";
import CohortInfo from "./CohortInfo";

const top = () => {
  return (
    <main className="container mx-auto p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
      <CohortInfo/>
      <RotatingCards/>
      <Path/>
      <Footer/>
      <FAQSection/>
      <TestimonialsCarousel/>
    </main>
  )
}

export default top