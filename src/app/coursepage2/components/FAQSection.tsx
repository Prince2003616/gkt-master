"use client";
import { useState } from "react";
import Image from "next/image";
import { FaArrowCircleRight } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs: FAQItem[] = [
    {
      question: "Who can take this course?",
      answer: "Anyone interested in learning new skills can take this course.",
    },
    {
      question: "Are there any prerequisites required?",
      answer:
        "No specific prerequisite required, but familiarity with Database concepts and SQL is helpful.",
    },
    {
      question:
        "Which are the top companies hiring certified professionals as per the current market trends in India?",
      answer:
        "Top companies include TCS, Infosys, Accenture, Wipro, and several MNCs hiring certified professionals.",
    },
    {
      question:
        "List down the job roles offered to a Fresher and a mid-senior level person?",
      answer:
        "Job roles include Software Developer, Data Analyst, and Database Administrator.",
    },
    {
      question: "List down the course takeaways",
      answer: "Hands-on experience, certification, and industry-ready skills.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-12 items-center bg-white">
      {/* Left Section */}
      <div className="space-y-8">
        <div>
          <h4 className="text-grey-500 flex pb-6 text-xl"><FaArrowCircleRight className="pr-2 text-2xl"/>FAQ</h4>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Explore Common Queries
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Whether you&apos;re seeking specific information or have a query in
            mind, this is your one-stop resource hub. If your question isn&apos;t
            addressed here, our dedicated support team is just a message away.
          </p>
        </div>
        <Image
          src="/Person.png" // Place your image in the public folder
          alt="Person working on laptop"
          width={600}
          height={400}
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Right Section */}
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4 ">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex items-center w-full text-left text-lg font-semibold text-gray-900 focus:outline-none"
            >
              <FaArrowCircleRight
                className={`transition-transform duration-300 ${
                  activeIndex === index ? "transform rotate-90" : ""
                }`}
              />
              <span className="ml-2 text-wrap text-sm">{faq.question}</span>
            </button>

            {/* Answer */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === index
                  ? "max-h-40 mt-2 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-600 ml-8">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
