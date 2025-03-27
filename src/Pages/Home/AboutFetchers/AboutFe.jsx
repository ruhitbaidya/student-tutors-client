import { Link } from "react-router-dom";

const PlatformSection = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          A Powerful, Intuitive Platform Built for Educators
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Transform your knowledge into a thriving online business with
          Teachable—the all-in-one platform designed to make course creation
          seamless, beautiful, and scalable.
        </p>
        <div className="w-24 h-1 bg-indigo-600 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
          <div className="p-6 flex-grow">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Easy-to-Use Course Builder
            </h3>
            <p className="text-gray-600">
              Drag-and-drop simplicity lets you design engaging lessons in
              minutes.
            </p>
          </div>
          <div className="px-6 pb-6">
            <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium inline-block">
              New Feature
            </span>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
          <div className="p-6 flex-grow">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Custom Branding
            </h3>
            <p className="text-gray-600">
              Personalize your school with indigo-themed colors, logos, and
              fonts for a polished look.
            </p>
          </div>
          <div className="px-6 pb-6">
            <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium inline-block">
              Popular
            </span>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
          <div className="p-6 flex-grow">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Secure Payments
            </h3>
            <p className="text-gray-600">
              Accept global payments, offer subscriptions, or create payment
              plans effortlessly.
            </p>
          </div>
          <div className="px-6 pb-6">
            <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium inline-block">
              Essential
            </span>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
          <div className="p-6 flex-grow">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Engagement Tools
            </h3>
            <p className="text-gray-600">
              Quizzes, discussions, and certificates keep students motivated.
            </p>
          </div>
          <div className="px-6 pb-6">
            <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium inline-block">
              Interactive
            </span>
          </div>
        </div>

        {/* Feature 5 */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
          <div className="p-6 flex-grow">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Insightful Analytics
            </h3>
            <p className="text-gray-600">
              Track student progress, revenue, and growth with real-time data.
            </p>
          </div>
          <div className="px-6 pb-6">
            <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium inline-block">
              Data-Driven
            </span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-12 text-center">
        <Link to="/register">
          <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
            Get Started Today
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PlatformSection;
