import React, { memo } from 'react';
import { CourseData } from '@/app/utils/api';

interface CourseCardProps {
  courses: CourseData[];
  onLoadMore: () => void;
  hasMore: boolean;
}

const CourseCard: React.FC<CourseCardProps> = memo(({ courses, onLoadMore, hasMore }) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div 
            key={course.courseId} 
            className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lavender-900/20 hover:shadow-lg"
          >
            <div className="p-6">
              {/* Partner Badge */}
              {course.Partner && (
                <div className="mb-3">
                  <span className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full">
                    {course.Partner.partnerName}
                  </span>
                </div>
              )}
              
              {/* Category Tag */}
              <div className="flex items-center mb-3">
                {course.CourseCategory && (
                  <span className="bg-lavender-900/50 text-lavender-200 text-xs px-2 py-1 rounded-full border border-lavender-700">
                    {course.CourseCategory.categoryName}
                  </span>
                )}
              </div>
              
              {/* Course Title */}
              <h3 className="text-lg font-bold text-gray-200 mb-3 line-clamp-2">
                {course.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      
      {hasMore && (
        <div className="flex justify-center mt-10">
          <button 
            onClick={onLoadMore}
            className="bg-lavender-600 text-white px-8 py-3 rounded-lg hover:bg-lavender-700 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Load More Courses
          </button>
        </div>
      )}
    </div>
  );
});

CourseCard.displayName = 'CourseCard';
export default CourseCard;
