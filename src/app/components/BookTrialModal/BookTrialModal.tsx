import React, { useState } from 'react';

interface BookTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookTrialModal: React.FC<BookTrialModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    education: '',
    jobRole: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-3xl p-8 max-w-md w-full mx-4 relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6 text-white">Book Your Free <span className="text-lavender-500">Trial</span></h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name *"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-lavender-500 focus:outline-none text-white placeholder-gray-400"
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number *"
            required
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-lavender-500 focus:outline-none text-white placeholder-gray-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-lavender-500 focus:outline-none text-white placeholder-gray-400"
          />
          <input
            type="text"
            name="education"
            placeholder="Education Qualification"
            value={formData.education}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-lavender-500 focus:outline-none text-white placeholder-gray-400"
          />
          <input
            type="text"
            name="jobRole"
            placeholder="Job Role"
            value={formData.jobRole}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-lavender-500 focus:outline-none text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-lavender-500 to-blue-500 hover:from-lavender-600 hover:to-lavender-700 text-white rounded-lg transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookTrialModal; 