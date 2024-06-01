import { LuMenu } from "react-icons/lu";
import { SiSololearn } from "react-icons/si";
import "./dashboardstyle.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import useQueryGetSecure from "../Hooks/QueryGet/useQueryGetSecure";
import useUserContext from "../Hooks/UserContext/useUserContext";

const Dashboard = () => {
  const { user } = useUserContext();
  const [secureData] = useQueryGetSecure(`checkRole/${user.email}`);
  // console.log(secureData)
  const rulesdins = secureData?.data;
  let text = "";

  let links = "";
  if (rulesdins?.roles === "admin") {
    text ="Admin"
    links = (
      <>
        <li>
          {" "}
          <NavLink to="/dashboard/viewalluseradmin">
            {" "}
            View all users{" "}
          </NavLink>{" "}
        </li>
        <li>
          {" "}
          <NavLink to="/dashboard/viewallstudysessionadmin">
            {" "}
            View all study session{" "}
          </NavLink>{" "}
        </li>
        <li>
          {" "}
          <NavLink to="/dashboard/viewallmetarialadmin">
            {" "}
            View all materials{" "}
          </NavLink>{" "}
        </li>
      </>
    );
  }
  if (rulesdins?.roles === "tutor") {
    text ="Tutor"
    links = (
      <>
        <li>
          <NavLink to="/dashboard/createstudysessiontutor">
            {" "}
            Create study session{" "}
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/viewallstudysessiontutor">
            {" "}
            View all study sessions{" "}
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/uploadmetarialtutor">
            {" "}
            Upload materials{" "}
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/viewallmetarialtutor">
            {" "}
            View all materials{" "}
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/viewallnotestutor"> View all notes </NavLink>
        </li>
      </>
    );
  }
  if (rulesdins?.roles === "student") {
    text ="Student"
    links = (
      <>
        <li>
          {" "}
          <NavLink to="/dashboard/bookedseddionstudent">
            {" "}
            View booked session{" "}
          </NavLink>{" "}
        </li>
        <li>
          {" "}
          <NavLink to="/dashboard/createnotesstudent">
            {" "}
            Create note{" "}
          </NavLink>{" "}
        </li>
        <li>
          {" "}
          <NavLink to="/dashboard/managepersonalstudent">
            {" "}
            Manage personal notes{" "}
          </NavLink>{" "}
        </li>
        <li>
          {" "}
          <NavLink to="/dashboard/viewallstudymetrialstudent">
            {" "}
            View all study materials{" "}
          </NavLink>{" "}
        </li>
      </>
    );
  }
  return (
    <div className=" m-[5px]">
      <div className="drawer lg:hidden">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="btn drawer-button text-[25px]">
            <LuMenu />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-[50%]  min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {links}
          </ul>
        </div>
      </div>
      <div className="">
        <div className="rounded-lg lg:flex ">
          <div className="w-[25%]">
            <div className="bg-[#272C4A] p-[20px] text-white hidden lg:flex">
              <div className="">
                <div>
                  <div className="flex items-center justify-center gap-[12px]">
                    <SiSololearn className="text-[30px] mb-[10px]" />
                    <h2 className="text-center text-[25px] font-[700] mb-[10px] ">
                      <span className="text-[#C0485E]">{text}</span> Dashboard
                    </h2>
                  </div>

                  <hr className="mb-[20px]" />
                  <div className="h-screen">
                    <div>
                      <ul className="listDesign text-[#A6AFBB]">{links}</ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%] lg:w-[75%]">
            <div className="bg-[#1D1E3C]">
              <div className="flex justify-between items-center py-[8px] px-[10px]">
                <div>
                  <h2 className="text-[18px] font-[600] text-gray-200">
                    <Link to="/">Ruhit Baidya</Link>
                  </h2>
                </div>
                <div>
                  <div>
                    <img
                      className="w-12 h-12 rounded-full border-[3px]"
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

{
  /* <li> <NavLink> View booked session </NavLink> </li>
        <li> <NavLink>  Create note </NavLink> </li>
        <li> <NavLink>  Manage personal notes </NavLink> </li>
        <li> <NavLink> View all study materials </NavLink> </li>
        {/* tutors router  */
}
// <li> <NavLink> Create study session </NavLink> </li>
// <li> <NavLink>  View all study sessions </NavLink> </li>
// <li> <NavLink>  Upload materials </NavLink> </li>
// <li> <NavLink>  View all materials </NavLink> </li>
// <li> <NavLink>  View all notes </NavLink> </li>
{
  /* admin route */
}
{
  /* <li> <NavLink> View all users </NavLink> </li>
<li> <NavLink>  View all study session </NavLink> </li>
<li> <NavLink> View all materials </NavLink> </li> */
}
