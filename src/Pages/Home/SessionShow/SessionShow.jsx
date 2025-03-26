import { useEffect, useState } from "react";
import usePullicApi from "../../../Hooks/publicApi/usePullicApi";
import { Link } from "react-router-dom";
import DateMatch from "../../../Hooks/DateMatch";

const SessionShow = () => {
  const [docCount, setDocCount] = useState(0);
  const [sessions, setSessions] = useState([]);
  const publicApicall = usePullicApi();

  useEffect(() => {
    publicApicall
      .get("/getForeHome")
      .then((res) => {
        setSessions(res?.data?.result);
        setDocCount(res?.data?.counts);
      })
      .catch((err) => console.log(err));
  }, [publicApicall]);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Embracing Serenity: A Journey to Inner Peace
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Join us for transformative sessions to achieve calm and tranquility
          through mindfulness, gentle meditation, and soothing techniques.
          Release stress and cultivate inner peace.
        </p>
        <div className="w-24 h-1 bg-indigo-600 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sessions?.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            <div className="p-6 flex-grow">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {item.sessionTitle}
              </h3>
              <p className="text-gray-600 mb-4">
                {item.sessionDescription.slice(0, 120)}...
              </p>
            </div>
            <div className="px-6 pb-6 flex flex-wrap gap-3">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  DateMatch(item.regStartDate, item.regEndDate)
                    ? "bg-gray-200 text-gray-600"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {DateMatch(item.regStartDate, item.regEndDate)
                  ? "Closed"
                  : "Open"}
              </span>
              <Link
                to={`/details/${item._id}`}
                className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium hover:bg-indigo-200 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* See All Button */}
      {docCount > 6 && (
        <div className="mt-12 text-center">
          <Link to="/allSession">
            <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
              Explore All Sessions
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SessionShow;
