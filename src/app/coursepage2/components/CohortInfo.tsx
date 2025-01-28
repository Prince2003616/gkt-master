// components/CohortInfo.tsx
import React from 'react';

const CohortInfo: React.FC = () => {
  return (
    <div className="flex space-x-8 p-10 px-6 bg-white">
      
      <div className="p-6 bg-gray-100 rounded-lg shadow-lg w-1/4">
        <h2 className="text-sm font-medium text-gray-600">Next Cohort starts</h2>
        <p className="text-xl font-bold text-gray-900 mt-2">28 Sep, 2023</p>
      </div>

      <div className="p-6 bg-gray-100 rounded-lg shadow-lg w-1/4">
        <h2 className="text-sm font-medium text-gray-600">Program Duration</h2>
        <p className="text-xl font-bold text-gray-900 mt-2">03 Months</p>
      </div>

      <div className="p-6 bg-gray-100 rounded-lg shadow-lg w-1/4">
        <h2 className="text-sm font-medium text-gray-600">Learning Format</h2>
        <p className="text-xl font-bold text-gray-900 mt-2">Online Live Classes</p>
      </div>

      <div className="p-6 bg-gray-100 rounded-lg shadow-lg w-1/4">
        <h2 className="text-sm font-medium text-gray-600">Batch Members</h2>
        <p className="text-xl font-bold text-gray-900 mt-2">3</p>
      </div>
    </div>
  );
};

export default CohortInfo;
