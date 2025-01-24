const Breadcrumb: React.FC = () => {
  return (
    <div className="bg-gray-850 py-8">
      <div className="container mx-auto px-6">
        <div className="bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-700/50">
          <nav className="flex items-center space-x-3 text-base text-gray-400 mb-8">
            <a href="#" className="text-lavender-500">Home</a>
            <span className="text-gray-600">&gt;</span>
            <span className="hover:text-lavender-500 transition-colors">Courses</span>
          </nav>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">
              <span className="text-lavender-500">All</span> Courses
            </h1>
            <p className="text-gray-300 text-lg">
              Master the World&apos;s Most In-Demand Skills and Grow Together
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Breadcrumb.displayName = 'Breadcrumb';
export default Breadcrumb;
  