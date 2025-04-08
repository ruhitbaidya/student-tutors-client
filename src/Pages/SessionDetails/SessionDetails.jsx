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
  FaShareAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaLink,
} from "react-icons/fa";
import { FiCopy } from "react-icons/fi";

const SessionDetails = () => {
  const [rolecheck, setRolecheck] = useState(true);
  const [showSocialShare, setShowSocialShare] = useState(false);
  const secureApiCall = useSecureApi();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [detailsdata, setDetailsData] = useState(null);
  const id = useLocation();
  const ids = id.pathname.split("/")[2];
  const [publicData] = useQueryGetPublic(`/sessionDetails/${ids}`);

  useEffect(() => {
    fetch(`https://student-tutor.vercel.app/sessionDetails/${ids}`)
      .then((res) => res.json())
      .then((data) => setDetailsData(data));
  }, [publicData, id, ids]);

  const handlePayment = (price, id, email) => {
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
        .then(() => {
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

  const shareSession = (platform) => {
    const url = window.location.href;
    const title = detailsdata?.sessionTitle;
    const description =
      detailsdata?.sessionDescription.substring(0, 100) + "...";

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(title)}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            url
          )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
            description
          )}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Link copied!",
          showConfirmButton: false,
          timer: 1500,
        });
        break;
      default:
        break;
    }
  };

  if (rolecheck === "student") {
    setRolecheck(false);
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Session Header */}
      <div className="text-center mb-12 relative">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 dark:text-white">
          Session Details
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full mb-8"></div>

        {/* Social Share Button */}
        <div className="absolute top-0 right-0">
          <button
            onClick={() => setShowSocialShare(!showSocialShare)}
            className="p-3 bg-indigo-100 hover:bg-indigo-200 rounded-full text-indigo-600 transition-colors"
          >
            <FaShareAlt />
          </button>

          {/* Social Share Dropdown */}
          {showSocialShare && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 py-2">
              <button
                onClick={() => shareSession("facebook")}
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-indigo-50 w-full text-left"
              >
                <FaFacebookF className="text-blue-600 mr-3" />
                Share on Facebook
              </button>
              <button
                onClick={() => shareSession("twitter")}
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-indigo-50 w-full text-left"
              >
                <FaTwitter className="text-blue-400 mr-3" />
                Share on Twitter
              </button>
              <button
                onClick={() => shareSession("linkedin")}
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-indigo-50 w-full text-left"
              >
                <FaLinkedinIn className="text-blue-700 mr-3" />
                Share on LinkedIn
              </button>
              <button
                onClick={() => shareSession("whatsapp")}
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-indigo-50 w-full text-left"
              >
                <FaWhatsapp className="text-green-500 mr-3" />
                Share on WhatsApp
              </button>
              <button
                onClick={() => shareSession("copy")}
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-indigo-50 w-full text-left"
              >
                <FiCopy className="text-gray-600 mr-3" />
                Copy Link
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Session Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-16 transition-all duration-300 hover:shadow-2xl">
        {/* Tutor Info with Gradient Background */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-center text-white">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 border-2 border-white/30">
              <FaUserTie className="text-3xl" />
            </div>
            <h2 className="text-2xl font-bold mb-1">
              {detailsdata?.tutorName}
            </h2>
            <p className="text-indigo-100 font-medium">Your Instructor</p>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Session Title & Description */}
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                {detailsdata?.sessionTitle}
              </h2>
              {/* Floating Social Icons */}
              <div className="flex space-x-2">
                {["facebook", "twitter", "linkedin", "whatsapp"].map(
                  (platform) => (
                    <button
                      key={platform}
                      onClick={() => shareSession(platform)}
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {platform === "facebook" && (
                        <FaFacebookF className="text-blue-600" />
                      )}
                      {platform === "twitter" && (
                        <FaTwitter className="text-blue-400" />
                      )}
                      {platform === "linkedin" && (
                        <FaLinkedinIn className="text-blue-700" />
                      )}
                      {platform === "whatsapp" && (
                        <FaWhatsapp className="text-green-500" />
                      )}
                    </button>
                  )
                )}
                <button
                  onClick={() => shareSession("copy")}
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <FaLink className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {detailsdata?.sessionDescription}
            </p>
          </div>

          {/* Session Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Registration Period */}
            <div className="bg-gradient-to-br from-indigo-50 to-white p-5 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-indigo-100 rounded-lg mr-4">
                  <FaCalendarAlt className="text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  Registration Period
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 pl-12">
                {detailsdata?.regStartDate} to {detailsdata?.regEndDate}
              </p>
            </div>

            {/* Class Schedule */}
            <div className="bg-gradient-to-br from-green-50 to-white p-5 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-green-100 rounded-lg mr-4">
                  <FaCalendarAlt className="text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  Class Schedule
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 pl-12">
                {detailsdata?.classStateDate} to {detailsdata?.classEndDate}
              </p>
            </div>

            {/* Duration */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-blue-100 rounded-lg mr-4">
                  <FaClock className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  Duration
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 pl-12">
                {detailsdata?.classDuration}
              </p>
            </div>

            {/* Registration Fee */}
            <div className="bg-gradient-to-br from-purple-50 to-white p-5 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-purple-100 rounded-lg mr-4">
                  <FaMoneyBillWave className="text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  Registration Fee
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 pl-12">
                ${detailsdata?.registerFree}
              </p>
            </div>
          </div>

          {/* Enrollment Section */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-xl text-center shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">
              Ready to Join This Session?
            </h3>
            <p className="text-indigo-100 mb-6">
              Limited seats available. Register now to secure your spot!
            </p>
            <button
              onClick={() =>
                handlePayment(
                  detailsdata?.registerFree,
                  detailsdata?._id,
                  detailsdata?.tutorEmail
                )
              }
              disabled={
                rolecheck === "student" &&
                DateMatch(detailsdata?.regStartDate, detailsdata?.regEndDate)
              }
              className={`py-3 px-8 rounded-lg text-lg font-bold transition-all duration-300 ${
                DateMatch(detailsdata?.regStartDate, detailsdata?.regEndDate) &&
                rolecheck === "student"
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-white text-indigo-600 hover:bg-indigo-100 transform hover:scale-105 shadow-md"
              }`}
            >
              {DateMatch(detailsdata?.regStartDate, detailsdata?.regEndDate)
                ? "Enroll Now"
                : "Registration Closed"}
              {detailsdata?.registerFree > 0 && (
                <span className="pl-2">for ${detailsdata?.registerFree}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Session Reviews
          </h2>
          <button
            onClick={() => shareSession("copy")}
            className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
          >
            <FaShareAlt className="mr-2" />
            Share Reviews
          </button>
        </div>
        <Allreviews id={detailsdata?._id} />
      </div>
    </div>
  );
};

export default SessionDetails;
