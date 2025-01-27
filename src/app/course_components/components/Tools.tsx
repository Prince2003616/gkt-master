"use client";
import React, { JSX, useEffect, useState } from "react";
import { FaCloud, FaShieldAlt, FaBoxes, FaDesktop } from "react-icons/fa";

// Define tools data separately
const toolsData = [
  { icon: <FaCloud />, title: "Google Cloud Platform Billing" },
  { icon: <FaShieldAlt />, title: "Google Cloud IAM & Admin" },
  { icon: <FaBoxes />, title: "Google Kubernetes Engine (GKE)" },
  { icon: <FaDesktop />, title: "Google Cloud Console" },
];

const Tools: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean[]>(Array(toolsData.length).fill(false));
  const [isH2Visible, setIsH2Visible] = useState<boolean>(false);
  const [isPVisible, setIsPVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;
          if (entry.isIntersecting) {
            if (target.classList.contains("tool-card")) {
              const index = Number(target.getAttribute("data-index"));
              setIsVisible((prev) => {
                const updated = [...prev];
                updated[index] = true;
                return updated;
              });
            } else if (target.id === "tools-section-h2") {
              setIsH2Visible(true);
            } else if (target.id === "tools-section-p") {
              setIsPVisible(true);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const elements = document.querySelectorAll(".tool-card, #tools-section-h2, #tools-section-p");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="tools-section" className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2
          id="tools-section-h2"
          className={`text-3xl font-bold text-left mb-6 transition-all duration-500 ease-in-out ${
            isH2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Tools We Cover
        </h2>
        <p
          id="tools-section-p"
          className={`text-left text-gray-300 mb-12 transition-all duration-500 ease-in-out ${
            isPVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          The Google Associate Cloud Engineer (ACE) certification is a valuable credential
          that demonstrates your skills and knowledge in Google Cloud Platform (GCP). It is
          designed for individuals who have experience working with public clouds and on-premises
          solutions, and who are able to use the Google Cloud Console and the command-line
          interface to perform common platform-based tasks.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {toolsData.map((tool, index) => (
            <div
              key={index}
              data-index={index}
              className={`tool-card flex items-center space-x-3 transition-all duration-500 ease-in-out ${
                isVisible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <div className="text-blue-400 text-5xl">{tool.icon}</div>
              <h5 className="text-xl">{tool.title}</h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
