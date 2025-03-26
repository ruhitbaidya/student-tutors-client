import { MdOutlineDateRange } from "react-icons/md";
import { SiLibreofficewriter } from "react-icons/si";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Mastering JavaScript in 2025",
    description:
      "Learn the latest JavaScript features and best practices to level up your coding skills.",
    image:
      "https://www.sevenmentor.com/wp-content/uploads/2025/01/unnamed-2025-01-27T152049.354.jpg",
    author: "John Doe",
    date: "2025-03-20",
  },
  {
    id: 2,
    title: "10 Tips for Web Development Success",
    description:
      "Discover key strategies to become a better web developer in today's tech world.",
    image:
      "https://mytasker.com/blog/images/posts/21_web_design_tips_you_just_can_not_miss.JPG",
    author: "Jane Smith",
    date: "2025-03-18",
  },
  {
    id: 3,
    title: "React vs Vue: Which One to Choose?",
    description:
      "A detailed comparison of React and Vue.js to help you decide the best framework for your project.",
    image:
      "https://www.whitelotuscorporation.com/wp-content/uploads/2024/05/react_vs_vue.webp",
    author: "Alex Johnson",
    date: "2025-03-15",
  },
  {
    id: 4,
    title: "The Future of AI in Web Development",
    description:
      "Explore how artificial intelligence is shaping the future of web applications and development.",
    image:
      "https://media.designrush.com/articles/768225/conversions/The-Future-of-AI-in-Web-Development-Hero-preview.jpg",
    author: "Emily Brown",
    date: "2025-03-10",
  },
  {
    id: 5,
    title: "Top 5 CSS Tricks You Need to Know",
    description:
      "Enhance your styling skills with these must-know CSS techniques for modern web design.",
    image: "https://i.ytimg.com/vi/wfaDzSL6ll0/maxresdefault.jpg",
    author: "Michael Lee",
    date: "2025-03-05",
  },
  {
    id: 6,
    title: "How to Build a Full-Stack App with Next.js",
    description:
      "A step-by-step guide to creating a powerful full-stack application using Next.js and Node.js.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNOMyhaQCP6rlrFcE_uPSQBUrkKxaaW2pBdw&s",
    author: "Sophia Williams",
    date: "2025-03-01",
  },
];

const Blogs = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Latest Blog Posts
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest trends and insights in tech and education
        </p>
        <div className="w-24 h-1 bg-indigo-600 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-48 overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                src={item.image}
                alt={item.title}
              />
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <MdOutlineDateRange className="mr-1" />
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center">
                  <SiLibreofficewriter className="mr-1" />
                  {item.author}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                {item.title}
              </h3>

              <p className="text-gray-600 mb-5 line-clamp-2">
                {item.description}
              </p>

              <Link
                to={`/blog/${item.id}`}
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
              >
                Read More
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
          View All Blog Posts
        </button>
      </div>
    </div>
  );
};

export default Blogs;
