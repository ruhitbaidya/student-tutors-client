import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import usePullicApi from "../../../Hooks/publicApi/usePullicApi";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const ids = useLocation();
  const id = ids.pathname.split("/")[2];
  const publicApicall = usePullicApi();

  useEffect(() => {
    publicApicall
      .get(`/get-singal-blog/${id}`)
      .then((res) => setBlog(res?.data))
      .catch((err) => console.log(err));
  }, [id, publicApicall]);
  return (
    <div>
      {blog && (
        <>
          <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
            {/* Blog Image */}
            <div className="mb-6 rounded-lg overflow-hidden">
              <img
                src={blog?.image}
                alt={blog?.title}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Date Badge */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full">
                {new Date(blog?.createAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Blog Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {blog.title}
            </h1>

            {/* Blog Description */}
            <div className="prose prose-indigo text-gray-600 mb-6">
              <p className="text-base leading-relaxed">{blog?.description}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogDetails;
