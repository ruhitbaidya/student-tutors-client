import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import usePullicApi from "../../../Hooks/publicApi/usePullicApi";
import SocialShareIcons from "../../../Components/SocialIcon/SocialIcons";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const ids = useLocation();
  const id = ids.pathname.split("/")[2];
  const publicApicall = usePullicApi();

  useEffect(() => {
    setIsLoading(true);
    publicApicall
      .get(`/get-singal-blog/${id}`)
      .then((res) => {
        setBlog(res?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [id, publicApicall]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            Blog not found
          </h2>
          <p className="text-gray-500 mt-2">
            The requested blog could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Blog Image */}
          <div className="relative h-80 w-full overflow-hidden">
            <img
              src={blog?.image}
              alt={blog?.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          <div className="p-8">
            {/* Date and Category */}
            {/* <div className="flex items-center space-x-4 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {new Date(blog?.createAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="text-gray-500 text-sm">•</span>
              <span className="text-gray-500 text-sm">5 min read</span>
            </div> */}

            {/* Blog Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Author Info */}
            {/* <div className="flex items-center mb-8">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
                  {blog.author?.charAt(0) || "A"}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {blog.author || "Anonymous"}
                </p>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            </div> */}

            {/* Blog Content */}
            <div className="prose prose-lg max-w-none text-gray-700 mb-8">
              <p className="text-lg leading-relaxed mb-6">
                {blog?.description}
              </p>

              {/* You can add more content sections here if your blog has more structure */}
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-indigo-300 my-6">
                <p className="italic text-gray-600">
                  This is a highlighted quote from the article that stands out.
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                Technology
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                Web Development
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                React
              </span>
            </div>

            {/* Social Sharing */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-4">
                Share this article
              </h3>
              <div>
                <SocialShareIcons
                  title={blog?.title}
                  description={blog?.description}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
