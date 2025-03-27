import { Link } from "react-router-dom";
import { SiSololearn } from "react-icons/si";
import useUserContext from "../../Hooks/UserContext/useUserContext";
import { useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const { user, logout } = useUserContext();
  const [menus, setMenus] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <SiSololearn className="text-2xl text-indigo-600" />
              <span className="text-xl font-bold text-gray-800">
                <span className="text-indigo-600">T</span>eachable
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/blog"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Blogs
            </Link>
            <Link
              to="/allSession"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Courses
            </Link>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMenus(!menus)}
                className="flex items-center text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Services
                {menus ? (
                  <IoIosArrowDown className="ml-1" />
                ) : (
                  <IoIosArrowForward className="ml-1" />
                )}
              </button>
            </div>

            <Link
              to="/contact"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Contact
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  Dashboard
                </Link>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="avatar hover:ring-2 hover:ring-indigo-200 rounded-full transition-all"
                  >
                    <div className="w-10 h-10 rounded-full border-2 border-indigo-100">
                      <img src={user?.photoURL} alt="User profile" />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52 border border-gray-100"
                  >
                    <li>
                      <button
                        onClick={() => {
                          logout();
                          window.location.reload();
                        }}
                        className="text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/signin"
                  className="text-indigo-600 hover:text-indigo-800 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              About
            </Link>
            <Link
              to="/cource"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              Courses
            </Link>
            <button
              onClick={() => setMenus(!menus)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              Services
              {menus ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </button>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              Contact
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    window.location.reload();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="pt-4 pb-2 border-t border-gray-200">
                <Link
                  to="/signin"
                  className="block w-full px-4 py-2 text-center rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50 mb-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full px-4 py-2 text-center rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Services Mega Menu */}
      {menus && (
        <div className="absolute left-0 right-0 top-full bg-white shadow-xl z-40 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2 border-indigo-100">
                  App Development
                </h3>
                <ul className="space-y-3 pl-2 border-l-2 border-indigo-200">
                  {[
                    "React Native",
                    "Swift (iOS)",
                    "Kotlin (Android)",
                    "Flutter",
                    "Magento",
                  ].map((item) => (
                    <li key={item}>
                      <Link
                        onClick={() => setMenus(false)}
                        to="/allSession"
                        state={{ text: item }}
                        className="text-gray-600 hover:text-indigo-600 transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2 border-indigo-100">
                  Web Development
                </h3>
                <ul className="space-y-3 pl-2 border-l-2 border-indigo-200">
                  {["React", "Angular", "Vue", "Node.js", "Django"].map(
                    (item) => (
                      <li key={item}>
                        <Link
                          onClick={() => setMenus(false)}
                          to="/allSession"
                          state={{ text: item }}
                          className="text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                          {item}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2 border-indigo-100">
                  Desktop App Development
                </h3>
                <ul className="space-y-3 pl-2 border-l-2 border-indigo-200">
                  {["web Development", "Java FX", ".NET", "Qt", "Python"].map(
                    (item) => (
                      <li key={item}>
                        <Link
                          onClick={() => setMenus(false)}
                          to="/allSession"
                          state={{ text: item }}
                          className="text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                          {item}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
