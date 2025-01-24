"use client";
import React, { useState, useMemo } from 'react';
import { CourseData } from '@/app/utils/api';

interface SidebarProps {
  onFilter: (partnerId: number | null, technology: string | null) => void;
  courses: CourseData[];
  onSearch: (query: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onFilter, courses, onSearch }) => {
  const [filters, setFilters] = useState({
    partner: null as number | null,
    technology: null as string | null,
    search: ''
  });

  const { partners, technologies } = useMemo(() => {
    const partnerMap: Record<number, string> = {};
    const techSet = new Set<string>();

    // Get all partners
    courses.forEach((course: CourseData) => {
      if (course.Partner) {
        partnerMap[course.Partner.partnerId] = course.Partner.partnerName;
      }
    });

    // Get technologies based on selected partner
    const relevantCourses = filters.partner 
      ? courses.filter(course => course.Partner?.partnerId === filters.partner)
      : courses;

    relevantCourses.forEach((course: CourseData) => {
      if (course.CourseCategory?.categoryName) {
        techSet.add(course.CourseCategory.categoryName);
      }
    });

    return {
      partners: Object.entries(partnerMap).map(([id, name]) => ({
        id: Number(id),
        name,
      })),
      technologies: Array.from(techSet)
    };
  }, [courses, filters.partner]);

  const handleFilterChange = (
    type: 'partner' | 'technology' | 'search', 
    value: number | string | null
  ) => {
    const newFilters = { ...filters, [type]: value };
    
    if (type === 'partner') {
      newFilters.technology = null;
    }
    
    setFilters(newFilters);
    
    if (type === 'search') {
      onSearch(typeof value === 'string' ? value : '');
    } else {
      onFilter(newFilters.partner, newFilters.technology);
    }
  };

  const resetFilters = () => {
    setFilters({ partner: null, technology: null, search: '' });
    onFilter(null, null);
    onSearch('');
  };

  return (
    <div className="p-6 bg-gray-850 rounded-2xl shadow-lg border border-gray-750">
      <h2 className="text-xl font-bold text-gray-200 mb-6">Course Filters</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-lavender-500 focus:ring-2 focus:ring-lavender-600/25 transition-all"
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
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
      </div>

      {/* Partner Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
          Partner
        </h3>
        <div className="space-y-2">
          {partners.map((partner) => (
            <button
              key={partner.id}
              onClick={() => handleFilterChange('partner', partner.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-all ${
                filters.partner === partner.id
                  ? 'bg-lavender-900/50 text-lavender-200 font-medium border border-lavender-700'
                  : 'text-gray-300 hover:bg-lavender-900/20'
              }`}
            >
              {partner.name}
            </button>
          ))}
        </div>
      </div>

      {/* Technology Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
          Technology
        </h3>
        <div className="space-y-2">
          {technologies.map((technology) => (
            <button
              key={technology}
              onClick={() => handleFilterChange('technology', technology)}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-all ${
                filters.technology === technology
                  ? 'bg-lavender-900/50 text-lavender-200 font-medium border border-lavender-700'
                  : 'text-gray-300 hover:bg-lavender-900/20'
              }`}
            >
              {technology}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="w-full py-3 px-4 rounded-xl border-2 border-lavender-700/50 text-gray-300 hover:bg-lavender-900/20 transition-all font-medium"
      >
        Reset All Filters
      </button>
    </div>
  );
};

export default Sidebar;
