import { createBrowserRouter } from "react-router-dom";
import Root from "../Pages/Root/Root";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import ViewAllUser from "../Dashboard/AdminPage/ViewAllUser";
import ViewAllStudySession from "../Dashboard/AdminPage/ViewAllStudySession";
import ViewAllMetirial from "../Dashboard/AdminPage/ViewAllMetirial";
import CreateStudySession from "../Dashboard/TutorPage/CreateStudySession";
import ViewAllstudySessionTutor from "../Dashboard/TutorPage/ViewAllstudySessionTutor";
import UploadMetarial from "../Dashboard/TutorPage/UploadMetarial";
import ViewAllmeterial from "../Dashboard/TutorPage/ViewAllmeterial";
import ViewBookedSection from "../Dashboard/StudentPage/ViewBookedSession";
import CreateNotes from "../Dashboard/StudentPage/CreateNotes";
import ManagePersonalNotes from "../Dashboard/StudentPage/ManagePersonalNotes";
import ViewAllStudyMetarial from "../Dashboard/StudentPage/ViewAllStudyMetarial";
import AdminPageProtact from "./AdminPageProtact";
import TutorPageProtact from "./TutorPageProtact";
import StudentPageProtact from "./StudentPageProtact";
import MetarialuploadPage from "../Dashboard/TutorPage/MetarialuploadPage";
import axios from "axios";
import UpdateMetrial from "../Dashboard/TutorPage/UpdateMetrial";
import PrivateRouter from "./PrivateRouter";
import SessionDetails from "../Pages/SessionDetails/SessionDetails";
import Allsession from "../Pages/Home/SessionShow/Allsession";
import YourPayment from "../Pages/Payments/YourPayment";
import StSessionDetails from "../Dashboard/StudentPage/StSessionDetails";
import ShowAllMetrial from "../Dashboard/StudentPage/ShowAllMetrial";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import About from "../Pages/About/About";
import Services from "../Pages/Services/Services";
import Contact from "../Pages/Contact/Contact";
import Blogs from "../Pages/Blogs/Blogs";
import CreateBlog from "../Dashboard/AdminPage/CreateBlog";
import BlogDetails from "../Pages/Home/Blogs/BlogDetails";
import DashboardRoot from "../Dashboard/DashboardRoot";
import Profile from "../Dashboard/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/blog",
        element: <Blogs />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetails />,
      },

      {
        path: "/signin",
        element: <Login></Login>,
      },
      {
        path: "/details/:id",
        element: <SessionDetails></SessionDetails>,
      },
      {
        path: "/allSession",
        element: <Allsession></Allsession>,
      },
      {
        path: "/payment",
        element: (
          <PrivateRouter>
            <YourPayment></YourPayment>
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <Dashboard></Dashboard>
      </PrivateRouter>
    ),
    children: [
      {
        path: "",
        element: <DashboardRoot />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "viewalluseradmin",
        element: (
          <AdminPageProtact>
            <ViewAllUser></ViewAllUser>
          </AdminPageProtact>
        ),
      },
      {
        path: "viewallstudysessionadmin",
        element: (
          <AdminPageProtact>
            <ViewAllStudySession></ViewAllStudySession>
          </AdminPageProtact>
        ),
      },
      {
        path: "viewallmetarialadmin",
        element: (
          <AdminPageProtact>
            <ViewAllMetirial></ViewAllMetirial>
          </AdminPageProtact>
        ),
      },
      {
        path: "blog",
        element: (
          <AdminPageProtact>
            <CreateBlog />
          </AdminPageProtact>
        ),
      },
      {
        path: "createstudysessiontutor",
        element: (
          <TutorPageProtact>
            <CreateStudySession></CreateStudySession>
          </TutorPageProtact>
        ),
      },
      {
        path: "viewallstudysessiontutor",
        element: (
          <TutorPageProtact>
            <ViewAllstudySessionTutor></ViewAllstudySessionTutor>
          </TutorPageProtact>
        ),
      },
      {
        path: "uploadmetarialtutor",
        element: (
          <TutorPageProtact>
            <UploadMetarial></UploadMetarial>
          </TutorPageProtact>
        ),
      },
      {
        path: "viewallmetarialtutor",
        element: (
          <TutorPageProtact>
            <ViewAllmeterial></ViewAllmeterial>
          </TutorPageProtact>
        ),
      },
      {
        path: "materialUpload",
        element: (
          <TutorPageProtact>
            <MetarialuploadPage></MetarialuploadPage>
          </TutorPageProtact>
        ),
      },
      {
        path: "tutorUpdatemetrial/:id",
        loader: ({ params }) => {
          console.log(params.id);
          return axios.get(
            `https://student-tutor.vercel.app/getForUpdate/${params.id}`
          );
        },
        element: <UpdateMetrial></UpdateMetrial>,
      },
      {
        path: "bookedseddionstudent",
        element: (
          <StudentPageProtact>
            <ViewBookedSection></ViewBookedSection>
          </StudentPageProtact>
        ),
      },
      {
        path: "createnotesstudent",
        element: (
          <StudentPageProtact>
            <CreateNotes></CreateNotes>
          </StudentPageProtact>
        ),
      },
      {
        path: "managepersonalstudent",
        element: (
          <StudentPageProtact>
            <ManagePersonalNotes></ManagePersonalNotes>
          </StudentPageProtact>
        ),
      },
      {
        path: "viewallstudymetrialstudent",
        element: (
          <StudentPageProtact>
            <ViewAllStudyMetarial></ViewAllStudyMetarial>
          </StudentPageProtact>
        ),
      },
      {
        path: "metrialall/:id",
        element: (
          <StudentPageProtact>
            <ShowAllMetrial></ShowAllMetrial>
          </StudentPageProtact>
        ),
      },
      {
        path: "sessionDetailSt/:id",
        loader: ({ params }) =>
          axios.get(`https://student-tutor.vercel.app/getDetails/${params.id}`),
        element: <StSessionDetails></StSessionDetails>,
      },
    ],
  },
]);
export default router;
