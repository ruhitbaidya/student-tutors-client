import { useState } from "react";
import useQueryGetSecure from "../Hooks/QueryGet/useQueryGetSecure";
import useUserContext from "../Hooks/UserContext/useUserContext";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import { FaRegCopy } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const Profile = () => {
  const [copyStatus, setCopyStatus] = useState("Click to copy email");
  const { user } = useUserContext();
  const [secureData] = useQueryGetSecure(`checkRole/${user.email}`);
  const userData = secureData?.data;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(user?.email);
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus("Click to copy email"), 2000);
    } catch (err) {
      setCopyStatus("Failed to copy");
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-indigo-800 to-purple-700 h-40 rounded-t-lg relative">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="w-32 h-32 border-4 border-white rounded-full bg-white shadow-lg">
              <img
                className="w-full h-full rounded-full object-cover"
                src={user?.photoURL || "https://via.placeholder.com/128"}
                alt="Profile"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/128";
                }}
              />
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 px-6 pb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {user?.displayName || userData?.user?.images || "Anonymous User"}
            </h1>
            <div className="inline-flex items-center mt-2 px-4 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
              <HiOutlineShieldCheck className="mr-2" />
              {userData?.roles || "No role assigned"}
            </div>
          </div>

          {/* User Details Card */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <HiOutlineUser className="mr-2" />
              Personal Information
            </h2>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <div
                    data-tooltip-id="email-tooltip"
                    onClick={handleCopyEmail}
                    className="flex items-center ga-[15px] mt-1 cursor-pointer group"
                  >
                    <HiOutlineMail className="text-gray-700 mr-2 group-hover:text-indigo-600" />
                    <p className="text-gray-700 group-hover:text-indigo-600 font-medium">
                      {user?.email}
                    </p>
                    <FaRegCopy className="text-gray-700 ml-2 group-hover:text-indigo-600" />
                  </div>
                  <Tooltip
                    id="email-tooltip"
                    place="top"
                    content={copyStatus}
                  />
                </div>

                <div className="mt-4 sm:mt-0">
                  <p className="text-sm text-gray-500">Account Created</p>
                  <p className="text-gray-700 font-medium">
                    {new Date(
                      user?.metadata?.creationTime
                    ).toLocaleDateString() || "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
