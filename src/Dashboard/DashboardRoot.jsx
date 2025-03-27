import { useEffect, useState } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from "recharts";
import useQueryGetSecure from "../Hooks/QueryGet/useQueryGetSecure";
import useUserContext from "../Hooks/UserContext/useUserContext";

const DashboardRoot = () => {
  const { user } = useUserContext();
  const [allCounts, setAllCounts] = useState(null);
  const [notAdmin, setNotAdmin] = useState(false);
  const [chartdata, setChartData] = useState(null);
  const [secureData] = useQueryGetSecure("/admin-chart");
  const transformData = (data) => {
    return Object.entries(data).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: value,
      lineValue: value * 1.1,
    }));
  };
  useEffect(() => {
    const res = secureData;
    if (res?.data) {
      setNotAdmin(false);
      setAllCounts(res?.data);
      setChartData(transformData(res?.data));
    }
    if (res?.data?.success === false) {
      setNotAdmin(true);
    }
  }, [secureData, user]);

  return (
    <div>
      {notAdmin ? (
        <>
          <div>
            <div>
              <h2 className="text-4xl text-center font-bold mb-[25px]">
                WelCome To Your Dashboard
              </h2>
              <p className="text-center text-2xl">
                Select Sidebar Menu And Check Your Cources
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Student Counter */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-100">
                        Total Students
                      </p>
                      <h3 className="mt-2 text-3xl font-bold">
                        {allCounts?.student || 0}
                      </h3>
                    </div>
                    <div className="p-3 rounded-full bg-blue-500 bg-opacity-20">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-blue-100 text-sm">
                      +5.2% from last month
                    </span>
                  </div>
                </div>
              </div>

              {/* Tutor Counter */}
              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-100">
                        Total Tutors
                      </p>
                      <h3 className="mt-2 text-3xl font-bold">
                        {allCounts?.tutor || 0}
                      </h3>
                    </div>
                    <div className="p-3 rounded-full bg-purple-500 bg-opacity-20">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-purple-100 text-sm">
                      +3.1% from last month
                    </span>
                  </div>
                </div>
              </div>

              {/* Course Counter */}
              <div className="bg-gradient-to-br from-pink-600 to-indigo-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-pink-100">
                        Total Courses
                      </p>
                      <h3 className="mt-2 text-3xl font-bold">
                        {allCounts?.cource || 0}
                      </h3>
                    </div>
                    <div className="p-3 rounded-full bg-pink-500 bg-opacity-20">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-pink-100 text-sm">
                      +8.7% from last month
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[20px]">
            <h2 className="text-4xl font-bold text-indigo-800">Chart here</h2>
            <div>
              <div
                style={{
                  width: "90%",
                  height: "400px",
                  margin: "20px 0",
                }}
              >
                <ResponsiveContainer>
                  <ComposedChart
                    data={chartdata}
                    layout="horizontal" // Standard left-to-right
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="name" type="category" axisLine={true} />
                    <YAxis type="number" domain={[0, "dataMax + 1"]} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="value"
                      barSize={30}
                      fill="#413ea0"
                      radius={[4, 4, 0, 0]} // Rounded top corners only
                    />
                    <Line
                      dataKey="lineValue"
                      stroke="#ff7300"
                      dot={{ r: 6 }}
                      strokeWidth={2}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardRoot;
