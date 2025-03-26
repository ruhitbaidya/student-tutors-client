import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DateMatch from "../../Hooks/DateMatch";
import Swal from "sweetalert2";
import useUserContext from "../../Hooks/UserContext/useUserContext";
import useSecureApi from "../../Hooks/SecureApi/useSecureApi";
import Allreviews from "./Allreviews";
import useQueryGetPublic from "../../Hooks/QueryGet/useQueryGet";
import {
  FaCalendarAlt,
  FaUserTie,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";

const SessionDetails = () => {
  const [rolecheck, setRolecheck] = useState(true);
  const secureApiCall = useSecureApi();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [detailsdata, setDetailsData] = useState(null);
  const id = useLocation();
  const ids = id.pathname.split("/")[2];
  const [publicData] = useQueryGetPublic(`/sessionDetails/${ids}`);

  useEffect(() => {
    fetch(`http://localhost:5000/sessionDetails/${ids}`)
      .then((res) => res.json())
      .then((data) => setDetailsData(data));
  }, [publicData, id, ids]);

  const handelpayment = (price, id, email) => {
    secureApiCall
      .get(`checkRole/${user?.email}`)
      .then((res) => setRolecheck(res.data.roles))
      .catch((err) => console.log(err));

    if (price > 0) {
      localStorage.setItem("price", price);
      localStorage.setItem(
        "cId",
        JSON.stringify({
          mySessionId: id,
          myEmail: user.email,
          sessionTutor: email,
        })
      );
      navigate("/payment");
    } else {
      secureApiCall
        .post("/bookedSession", {
          mySessionId: id,
          myEmail: user.email,
          sessionTutor: email,
        })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          Swal.fire({
            title: "Success!",
            text: "You successfully booked this session",
            icon: "success",
            confirmButtonColor: "#4f46e5",
          });
          localStorage.removeItem("price");
          localStorage.removeItem("cId");
        })
        .catch((err) => console.log(err));
    }
  };

  if (rolecheck === "student") {
    setRolecheck(false);
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Session Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Session Details
        </h1>
        <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
      </div>

      {/* Main Session Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
        {/* Tutor Info */}
        <div className="bg-indigo-50 p-6 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <FaUserTie className="text-indigo-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-indigo-700">
              {detailsdata?.tutorName}
            </h2>
          </div>
          <p className="text-indigo-600 font-medium">Your Instructor</p>
        </div>

        <div className="p-6 md:p-8">
          {/* Session Title & Description */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {detailsdata?.sessionTitle}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {detailsdata?.sessionDescription}
            </p>
          </div>

          {/* Session Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-indigo-50 p-5 rounded-lg border-l-4 border-indigo-500">
              <div className="flex items-center mb-2">
                <FaCalendarAlt className="text-indigo-600 mr-3" />
                <h3 className="font-semibold text-gray-800">
                  Registration Period
                </h3>
              </div>
              <p className="text-gray-600">
                {detailsdata?.regStartDate} to {detailsdata?.regEndDate}
              </p>
            </div>

            <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-500">
              <div className="flex items-center mb-2">
                <FaCalendarAlt className="text-green-600 mr-3" />
                <h3 className="font-semibold text-gray-800">Class Schedule</h3>
              </div>
              <p className="text-gray-600">
                {detailsdata?.classStateDate} to {detailsdata?.classEndDate}
              </p>
            </div>

            <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center mb-2">
                <FaClock className="text-blue-600 mr-3" />
                <h3 className="font-semibold text-gray-800">Duration</h3>
              </div>
              <p className="text-gray-600">{detailsdata?.classDuration}</p>
            </div>

            <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500">
              <div className="flex items-center mb-2">
                <FaMoneyBillWave className="text-purple-600 mr-3" />
                <h3 className="font-semibold text-gray-800">
                  Registration Fee
                </h3>
              </div>
              <p className="text-gray-600">${detailsdata?.registerFree}</p>
            </div>
          </div>

          {/* Enrollment Section */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-xl text-center">
            <h3 className="text-xl font-bold text-white mb-4">
              Ready to Join This Session?
            </h3>
            <button
              onClick={() =>
                handelpayment(
                  detailsdata?.registerFree,
                  detailsdata?._id,
                  detailsdata?.tutorEmail
                )
              }
              disabled={
                rolecheck ||
                DateMatch(detailsdata?.regStartDate, detailsdata?.regEndDate)
              }
              className={`py-3 px-8 rounded-lg text-lg font-bold transition-all duration-300 ${
                DateMatch(detailsdata?.regStartDate, detailsdata?.regEndDate) ||
                rolecheck
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-white text-indigo-600 hover:bg-indigo-100 transform hover:scale-105"
              }`}
            >
              {DateMatch(detailsdata?.regStartDate, detailsdata?.regEndDate)
                ? "Registration Closed"
                : "Enroll Now"}
              {detailsdata?.registerFree > 0 && (
                <span className="pl-2">for ${detailsdata?.registerFree}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Session Reviews
        </h2>
        <Allreviews id={detailsdata?._id} />
      </div>
    </div>
  );
};

export default SessionDetails;
