import { useState, useEffect } from 'react';
import { CourseData, fetchCourses } from '@/app/utils/api';

export const useCourseManagement = (coursesPerPage: number) => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseData[]>([]);
  const [displayedCourses, setDisplayedCourses] = useState<CourseData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getCourses = async () => {
      const fetchedCourses = await fetchCourses();
      setCourses(fetchedCourses);
      setFilteredCourses(fetchedCourses);
      setDisplayedCourses(fetchedCourses.slice(0, coursesPerPage));
    };

    getCourses();
  }, [coursesPerPage]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    setDisplayedCourses(prev => [...prev, ...filteredCourses.slice(startIndex, endIndex)]);
    setCurrentPage(nextPage);
  };

  const handleFilter = (partnerId: number | null, technology: string | null) => {
    let filtered = courses;
    if (partnerId) {
      filtered = filtered.filter(course => course.Partner?.partnerId === partnerId);
    }
    if (technology) {
      filtered = filtered.filter(course => course.CourseCategory?.categoryName === technology);
    }
    if (searchQuery) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredCourses(filtered);
    setDisplayedCourses(filtered.slice(0, coursesPerPage));
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    handleFilter(null, null);
  };

  return {
    courses,
    filteredCourses,
    displayedCourses,
    handleLoadMore,
    handleFilter,
    handleSearch,
    hasMore: displayedCourses.length < filteredCourses.length
  };
}; 