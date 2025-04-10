import { useEffect, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { Link } from "react-router-dom";
import usePullicApi from "../../../Hooks/publicApi/usePullicApi";

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const publicApicall = usePullicApi();
  useEffect(() => {
    publicApicall
      .get(`/get-blog`)
      .then((res) => {
        setBlogPosts(res?.data);
      })
      .catch((err) => console.log(err));
  }, [publicApicall]);
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl dark:text-white md:text-4xl font-bold text-gray-800 mb-3">
          Latest Blog Posts
        </h2>
        <p className="text-lg dark:text-white text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest trends and insights in tech and education
        </p>
        <div className="w-24 h-1 bg-indigo-600 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts &&
          blogPosts.slice(0, 6).map((item) => (
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
                    {new Date(item.createAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 mb-5 line-clamp-2">
                  {item.description}
                </p>

                <Link
                  to={`/blog/${item?._id}`}
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
        <Link to="/blog">
          <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
            View All Blog Posts
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
