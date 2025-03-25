import { Link } from "react-router-dom";
import { SiSololearn } from "react-icons/si";
import useUserContext from "../../Hooks/UserContext/useUserContext";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
const Navbar = () => {
  const { user, logout } = useUserContext();
  const [menus, setMenus] = useState(false);
  return (
    <div className="border fixed w-full top-0">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost text-xl">
            {" "}
            <SiSololearn className="text-[25px]" />{" "}
            <p>
              <span className="text-green-400 text-[22px] font-[600]">T</span>
              eachable
            </p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1"></ul>
        </div>
        <div className="navbar-end">
          <ul className="flex justify-center items-center gap-[25px]">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li className="flex justify-center items-center gap-[10px]">
              <Link onClick={() => setMenus(!menus)} to="#">
                Services
              </Link>
              {menus ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/dashboard">
                    <button>Dashboard</button>
                  </Link>
                </li>
                <li>
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn bg-transparent border-0 m-1 hover:bg-transparent"
                    >
                      <img
                        className="w-10 h-10 border-2 rounded-full"
                        src={user?.photoURL}
                        alt=""
                      />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <button
                          onClick={() => {
                            logout();
                            window.location.reload();
                          }}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              </>
            ) : (
              <>
                <Link to="/signin">Login</Link>
                <Link to="/register">SingUp</Link>
              </>
            )}
          </ul>
        </div>
        {/** mega menu  */}
        <div
          className={`absolute left-0 right-0 top-[70px] mx-auto w-full z-50 bg-white ${
            menus ? "" : "hidden"
          }`}
        >
          <div className="container mx-auto px-[20px]">
            <div>
              <div className="grid grid-cols-3">
                <div className="p-[20px]">
                  <h2 className="font-bold text-2xl mb-[25px]">
                    App Development
                  </h2>
                  <ul className="space-y-7 border-l-2 pl-[15px]">
                    <li>
                      <Link to="">React Native</Link>
                    </li>
                    <li>
                      <Link to="">Swift (iOS)</Link>
                    </li>
                    <li>
                      <Link to="">Kotlin (Android)</Link>
                    </li>
                    <li>
                      <Link to="">Flutter (for mobile)</Link>
                    </li>
                    <li>
                      <Link to="">Magento</Link>
                    </li>
                  </ul>
                </div>
                <div className="p-[20px]">
                  <h2 className="font-bold text-2xl mb-[25px]">
                    Web Development
                  </h2>
                  <ul className="space-y-7 border-l-2 pl-[15px]">
                    <li>
                      <Link to="">React Native</Link>
                    </li>
                    <li>
                      <Link to="">Swift (iOS)</Link>
                    </li>
                    <li>
                      <Link to="">Kotlin (Android)</Link>
                    </li>
                    <li>
                      <Link to="">Flutter (for mobile)</Link>
                    </li>
                    <li>
                      <Link to="">Magento</Link>
                    </li>
                  </ul>
                </div>
                <div className="p-[20px]">
                  <h2 className="font-bold text-2xl mb-[25px]">
                    Deskto App Development
                  </h2>
                  <ul className="space-y-7 border-l-2 pl-[15px]">
                    <li>
                      <Link to="">React Native</Link>
                    </li>
                    <li>
                      <Link to="">Swift (iOS)</Link>
                    </li>
                    <li>
                      <Link to="">Kotlin (Android)</Link>
                    </li>
                    <li>
                      <Link to="">Flutter (for mobile)</Link>
                    </li>
                    <li>
                      <Link to="">Magento</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
