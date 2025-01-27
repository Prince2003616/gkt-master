"use client";
import React from "react";
import { FaArrowCircleRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Nithya (Cloud Data Engineer)",
    company: "Newcrops",
    rating: 5,
    feedback:
      "I thoroughly enjoyed Cloud training. The trainer was able to give me real life scenarios that we face everyday that made the concepts clear and easily understandable. I am glad that I was part of the training program as I was able to make the most of it.",
  },
  {
    name: "Gokul (Cloud Developer)",
    company: "Gigamon",
    rating: 5,
    feedback:
      "Wanted to make a career in the cloud program but didn't know where to start. I heard about the training program by metacognitive through one of my colleagues and the program didn't disappoint me.",
  },
  {
    name: "Anika (Software Engineer)",
    company: "CloudTech Solutions",
    rating: 5,
    feedback:
      "The Cloud training program gave me confidence to upskill and grow professionally. The real-world examples and interactive sessions made it an enriching experience. I highly recommend it to anyone looking to improve their cloud skills.",
  },
];

const TestimonialsCarousel: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16 flex flex-col items-center">
      <h4 className="text-grey-500 flex pb-6 text-3xl"><FaArrowCircleRight className="pr-2 text-4xl"/>Testimonials</h4>
      <h2 className="text-4xl font-bold text-gray-800 mb-10">
        Words From Our Students!
      </h2>
      <div className="relative w-full max-w-7xl overflow-hidden">
        <div
          className="flex space-x-6 animate-scroll items-center"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {testimonials.concat(testimonials).map((testimonial, index) => (
            <div
              key={index}
              className="shrink-0 w-[300px] sm:w-[300px] h-80 rounded-3xl bg-[#0b0d20] shadow-lg text-white p-6"
            >
              <div className="flex flex-col justify-between h-fit">
                <div>
                  <h3 className="text-lg font-bold mb-1 mt-3">{testimonial.name}</h3>
                  <p className="text-sm text-gray-400 mb-2 mt-1">
                    {testimonial.company}
                  </p>
                  <div className="flex mb-2 mt-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic leading-relaxed text-wrap mt-1">
                  "{testimonial.feedback}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
