"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaCertificate, FaBookOpen, FaGraduationCap, FaAtom } from "react-icons/fa";

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const useIntersectionObserver = (threshold = 0.5) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current; // Store ref value
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (element) {
            observer.unobserve(element);
          }
        }
      },
      { threshold }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold]);

  return [elementRef, isVisible] as const;
};

const Card: React.FC<CardProps> = React.memo(({ title, description, icon, index }) => {
  const [cardRef, isVisible] = useIntersectionObserver(0.5);

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-1000 ease-in-out transform ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
      }`}
      style={{
        transitionDelay: `${index * 200}ms`,
      }}
    >
      <div className="bg-[#0D1424] text-white p-8 rounded-xl shadow-[4px_0_0_#1E3A8A,-4px_0_0_#1E3A8A,0_4px_0_#1E3A8A] h-60 flex flex-col justify-start items-start text-left my-2 hover:scale-105 hover:shadow-xl hover:bg-[#1E3A8A]">
        <div className="text-blue-500 text-4xl mb-6 hover:text-white">{icon}</div>
        <h3 className="text-xl font-bold mb-4 leading-snug hover:text-green-400">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed hover:text-green-400">{description}</p>
      </div>
    </div>
  );
});

Card.displayName = 'Card';

const cardDetails = [
  {
    title: "OEM Certification",
    description: "All programs are OEM certified programs. Recognized throughout the globe.",
    icon: <FaCertificate />,
  },
  {
    title: "Hands-On Learning",
    description: "All programs ensure practical exposure through the Labs.",
    icon: <FaBookOpen />,
  },
  {
    title: "Immersive Learning Experience",
    description: "All programs are live training sessions conducted by industry professionals.",
    icon: <FaGraduationCap />,
  },
  {
    title: "Study Generative AI Tool",
    description: "You will get access to generative AI tools, designed to cater to all your queries.",
    icon: <FaAtom />,
  },
];

const CardSection: React.FC = () => {
  const [sectionRef, isSectionVisible] = useIntersectionObserver(0.2);

  return (
    <div className="bg-gray-50 m-0 p-0 px-6">
      <section
        ref={sectionRef}
        className={`transition-all duration-1000 ease-in-out ${
          isSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-black">Why Join This Program?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {cardDetails.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              index={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CardSection;
