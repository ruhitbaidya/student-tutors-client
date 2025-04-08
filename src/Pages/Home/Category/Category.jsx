import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Programming",
    description: "Courses related to software development and coding.",
    icon: "💻",
  },
  {
    id: 2,
    name: "Web Development",
    description: "Courses on front-end, back-end, and full-stack development.",
    icon: "🌐",
  },
  {
    id: 3,
    name: "Data Science",
    description: "Courses covering machine learning, AI, and analytics.",
    icon: "📊",
  },
  {
    id: 4,
    name: "Business & Marketing",
    description:
      "Courses on digital marketing, entrepreneurship, and management.",
    icon: "📈",
  },
  {
    id: 5,
    name: "Design & Creativity",
    description: "Courses on graphic design, UI/UX, and video editing.",
    icon: "🎨",
  },
  {
    id: 6,
    name: "Personal Development",
    description: "Courses on communication skills, productivity, and mindset.",
    icon: "🧠",
  },
];

const Category = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl dark:text-white md:text-4xl font-bold text-gray-800 mb-3">
          Course Categories
        </h2>
        <p className="text-lg dark:text-white text-gray-600 max-w-2xl mx-auto">
          Choose your category and discover expert-led courses
        </p>
        <div className="w-24 h-1 bg-indigo-600 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.map((item) => (
          <Link
            to="/allSession"
            state={{ text: item.name }}
            key={item.id}
            className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="p-8 bg-white h-full transition-all duration-300 group-hover:bg-indigo-50">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-700">
                {item.name}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-indigo-600 bg-opacity-90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white p-6">
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="text-center mb-4">{item.description}</p>
              <span className="px-4 py-2 bg-white text-indigo-600 rounded-full text-sm font-medium">
                Explore Courses
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
