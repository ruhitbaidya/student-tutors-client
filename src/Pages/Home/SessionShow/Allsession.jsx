import { Link, useLocation } from "react-router-dom";
import DateMatch from "../../../Hooks/DateMatch";
import { useEffect, useState } from "react";
import usePullicApi from "../../../Hooks/publicApi/usePullicApi";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Allsession = () => {
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const texts = useLocation();
  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const publicApicall = usePullicApi();
  useEffect(() => {
    setLoading(true);

    publicApicall
      .get(`/getallsession/?page=${currentPage}&text=${texts?.state?.text}`)
      .then((res) => {
        setSessions(res?.data?.result);
        setPage(Math.ceil(res?.data?.documentCount / 6));
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [publicApicall, currentPage, texts]);

  const pages = Array.from({ length: page }, (_, index) => index + 1);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Explore All Sessions
        </h2>
        <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="h-[80vh]">
          <div className="animate-pulse space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-4 bg-gray-300 rounded mx-auto"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-4">
                  {[...Array(6)].map((_, i) => (
                    <>
                      <div key={i} className="flex w-52 flex-col gap-4">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Sessions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sessions?.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {item.sessionTitle}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {item.sessionDescription.slice(0, 100)}...
                  </p>
                  <div className="flex flex-wrap gap-3 mt-6">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        DateMatch(item.regStartDate, item.regEndDate)
                          ? "bg-gray-200 text-gray-600"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {DateMatch(item.regStartDate, item.regEndDate)
                        ? "Registration Open"
                        : "Registration Close"}
                    </span>
                    <Link
                      to={`/details/${item._id}`}
                      className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium hover:bg-indigo-200 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {page > 0 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <button
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage((current) => current - 1)}
                  className={`px-4 py-2 rounded-md flex items-center ${
                    currentPage === 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  <FaArrowLeft className="mr-2" />
                  Previous
                </button>

                {pages.map((item, ind) => (
                  <button
                    key={ind}
                    onClick={() => setCurrentPage(ind)}
                    className={`w-10 h-10 rounded-md flex items-center justify-center ${
                      currentPage === ind
                        ? "bg-indigo-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item}
                  </button>
                ))}

                <button
                  disabled={currentPage === page - 1}
                  onClick={() => setCurrentPage((current) => current + 1)}
                  className={`px-4 py-2 rounded-md flex items-center ${
                    currentPage === page - 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  Next
                  <FaArrowRight className="ml-2" />
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Allsession;
