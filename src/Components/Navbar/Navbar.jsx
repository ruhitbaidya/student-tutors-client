import { FiMenu } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { SiSololearn } from "react-icons/si";
import useUserContext from "../../Hooks/UserContext/useUserContext";
const Navbar = () => {
  const { user, logout } = useUserContext();
  const links = (
    <>
      <li>
        {" "}
        <NavLink to="/">Home</NavLink>{" "}
      </li>
    </>
  );
  return (
    <div className="border">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-[25px]"
            >
              <FiMenu />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
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
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn bg-transparent border-0 m-1 hover:bg-transparent"
                >
                  <img
                    className="w-10 h-10 border-2 rounded-full"
                    src="https://cdn-icons-png.flaticon.com/512/709/709699.png"
                    alt=""
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/dashboard">
                      <button>Dashboard</button>
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => logout()}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to="/signin">
                {" "}
                <button className="border py-[8px] px-[25px] mr-[10px] rounded-lg">
                  Login
                </button>{" "}
              </Link>
              <Link to="/register">
                {" "}
                <button className="border py-[8px] px-[25px] rounded-lg">
                  SingUp
                </button>{" "}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
