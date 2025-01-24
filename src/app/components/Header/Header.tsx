import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { CourseData, fetchCoursesByPartner } from "@/app/utils/api";
import BookTrialModal from '../BookTrialModal/BookTrialModal';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [groupedCourses, setGroupedCourses] = useState<Record<string, CourseData[]>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Combine both fetch and click outside listener
    const fetchCourses = async () => {
      const courses = await fetchCoursesByPartner();
      setGroupedCourses(courses);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    fetchCourses();
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCourses = useMemo(() => {
    if (searchTerm.trim() === '') return groupedCourses;
    
    return Object.entries(groupedCourses).reduce((acc, [partner, courses]) => {
      const filtered = courses.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filtered.length > 0) acc[partner] = filtered;
      return acc;
    }, {} as Record<string, CourseData[]>);
  }, [groupedCourses, searchTerm]);

  // Get the courses for the selected partner
  const selectedPartnerCourses = selectedPartner ? groupedCourses[selectedPartner] : [];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900/95 backdrop-blur-sm">
        <div className="text-center py-3 bg-gradient-to-b from-lavender-500 to-purple-900 transition-all text-white text-xl font-medium">
          Join Our AI Revolution: Let&apos;s Make Sure Robots Know Who&apos;s Boss!
        </div>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="mr-3"
            />
            <h1 className="font-bold text-lg">GK Cloud Solutions</h1>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block relative mx-4 flex-1 max-w-md">
            <input
              type="search"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:border-lavender-500"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {/* Programs Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-gray-200 hover:text-lavender-400 transition-colors"
              >
                Programs
                <svg
                  className={`ml-2 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Split Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-[800px] bg-gray-900 rounded-2xl shadow-xl border border-gray-800 overflow-hidden flex">
                  {/* Partners List */}
                  <div className="w-1/3 border-r border-gray-800">
                    <div className="p-4 bg-gray-850">
                      <h3 className="font-semibold text-lavender-400">Partners</h3>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                      {Object.entries(filteredCourses).map(([partner, courses]) => (
                        <button
                          key={partner}
                          onClick={() => setSelectedPartner(partner)}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors ${
                            selectedPartner === partner ? 'bg-gray-800' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-200">{partner}</span>
                            <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-0.5 rounded-full">
                              {courses.length}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Courses List */}
                  <div className="w-2/3">
                    <div className="p-4 bg-gray-850 border-b border-gray-800">
                      <h3 className="font-semibold text-lavender-400">
                        {selectedPartner ? `${selectedPartner} Courses` : 'Select a Partner'}
                      </h3>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                      {selectedPartner ? (
                        <div className="grid grid-cols-2 gap-2 p-2">
                          {selectedPartnerCourses.map((course) => (
                            <a
                              key={course.courseId}
                              href="#"
                              className="block p-3 text-gray-200 hover:bg-gray-800 transition-colors rounded-xl"
                            >
                              <p className="line-clamp-2">{course.title}</p>
                            </a>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center text-gray-400">
                          Select a partner to view courses
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => setIsModalOpen(true)} 
              className="bg-gradient-to-r from-lavender-500 to-blue-500 hover:from-lavender-600 hover:to-blue-600 text-white px-4 py-2 rounded-xl transition-all"
            >
              Book Your Trial
            </button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors">
              Login
            </button>
          </nav>
        </div>
      </header>

      <BookTrialModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

Header.displayName = 'Header';
export default Header;
