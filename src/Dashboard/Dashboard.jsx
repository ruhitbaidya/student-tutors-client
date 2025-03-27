import { LuMenu, LuLogOut } from "react-icons/lu";
import { SiSololearn } from "react-icons/si";
import { Link, NavLink, Outlet } from "react-router-dom";
import useQueryGetSecure from "../Hooks/QueryGet/useQueryGetSecure";
import useUserContext from "../Hooks/UserContext/useUserContext";
import {
  FaUserCircle,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUserShield,
} from "react-icons/fa";

const Dashboard = () => {
  const { user, logout } = useUserContext();
  const [secureData] = useQueryGetSecure(`checkRole/${user.email}`);
  const rulesdins = secureData?.data;

  // Role-based configuration
  const roleConfig = {
    admin: {
      title: "Admin",
      icon: <FaUserShield className="text-xl" />,
      links: [
        { path: "/dashboard/viewalluseradmin", label: "View All Users" },
        { path: "/dashboard/blog", label: "Blog" },
        { path: "/dashboard/profile", label: "My Profile" },
        {
          path: "/dashboard/viewallstudysessionadmin",
          label: "View All Study Sessions",
        },
        {
          path: "/dashboard/viewallmetarialadmin",
          label: "View All Materials",
        },
      ],
    },
    tutor: {
      title: "Tutor",
      icon: <FaChalkboardTeacher className="text-xl" />,
      links: [
        {
          path: "/dashboard/createstudysessiontutor",
          label: "Create Study Session",
        },
        {
          path: "/dashboard/viewallstudysessiontutor",
          label: "View All Study Sessions",
        },
        { path: "/dashboard/profile", label: "My Profile" },
        { path: "/dashboard/uploadmetarialtutor", label: "Upload Materials" },
        {
          path: "/dashboard/viewallmetarialtutor",
          label: "View All Materials",
        },
      ],
    },
    student: {
      title: "Student",
      icon: <FaUserGraduate className="text-xl" />,
      links: [
        { path: "/dashboard/bookedseddionstudent", label: "Booked Sessions" },
        { path: "/dashboard/createnotesstudent", label: "Create Notes" },
        { path: "/dashboard/managepersonalstudent", label: "Manage Notes" },
        { path: "/dashboard/profile", label: "My Profile" },
        {
          path: "/dashboard/viewallstudymetrialstudent",
          label: "Study Materials",
        },
      ],
    },
  };

  const currentRole = roleConfig[rulesdins?.roles] || {};
  const { title, links } = currentRole;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Drawer */}
      <div className="drawer lg:hidden z-50">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content fixed top-4 left-4">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-square btn-ghost"
          >
            <LuMenu className="text-2xl" />
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <div className="menu p-4 w-80 min-h-full bg-indigo-800 text-white">
            <div className="mb-8">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <SiSololearn className="text-3xl text-indigo-300" />
                <h2 className="text-xl font-bold">
                  <span className="text-indigo-300">{title}</span> Dashboard
                </h2>
              </Link>
              <div className="divider my-0"></div>
            </div>
            <ul className="space-y-2">
              {links?.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 ${
                        isActive ? "bg-indigo-700" : "hover:bg-indigo-700"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:flex lg:w-64 min-h-screen bg-indigo-800 text-white flex-col">
          <div className="p-6">
            <Link to="/" className="flex items-center gap-3 mb-8">
              <SiSololearn className="text-3xl text-indigo-300" />
              <h2 className="text-xl font-bold">
                <span className="text-indigo-300">{title}</span> Dashboard
              </h2>
            </Link>
            <div className="divider my-0"></div>
          </div>
          <nav className="flex-1 px-4">
            <ul className="space-y-2">
              {links?.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        isActive ? "bg-indigo-700" : "hover:bg-indigo-700"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="flex justify-between items-center px-6 py-4">
              <div className="lg:hidden">
                <label
                  htmlFor="dashboard-drawer"
                  className="btn btn-square btn-ghost"
                >
                  <LuMenu className="text-xl" />
                </label>
              </div>
              <div className="flex items-center gap-4">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        src={
                          user?.photoURL || (
                            <FaUserCircle className="text-2xl" />
                          )
                        }
                        alt="User"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "";
                        }}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <button onClick={logout} className="text-red-600">
                        <LuLogOut /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="hidden sm:block">
                  <p className="font-medium">{user?.displayName}</p>
                  <p className="text-sm text-gray-500 capitalize">
                    {rulesdins?.roles}
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="p-6 bg-gray-50 min-h-[calc(100vh-72px)]">
            {<Outlet /> || "thid"}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
