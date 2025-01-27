const SessionForm: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-3xl shadow-lg max-w-md w-full">
      <form className="space-y-4">
        <div>
          <h1 className="text-2xl p-4">Book Your One-One Session</h1>
        </div>
        {/* Complete Name Field */}
        <div className="relative">
          <input
            type="text"
            placeholder="Complete Name"
            className="w-full px-4 py-2 bg-transparent border-b-2 border-gray-400 text-white focus:outline-none"
          />
        </div>

        {/* Email Address Field */}
        <div className="relative">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 bg-transparent border-b-2 border-gray-400 text-white focus:outline-none"
          />
        </div>

        {/* Number Field */}
        <div className="flex relative">
          <span className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-900 px-2 text-white">+91</span>
          <input
            type="text"
            placeholder="Number"
            className="w-full pl-12 px-4 py-2 bg-transparent border-b-2 border-gray-400 text-white focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SessionForm;
