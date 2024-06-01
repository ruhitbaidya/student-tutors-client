import { createBrowserRouter } from "react-router-dom";
import SucessesPay from "../PymentsSuccess";
import Root from "../Pages/Root/Root";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import PrivateRouter from "./PrivateRouter";
import ViewAllUser from "../Dashboard/AdminPage/ViewAllUser";
import ViewAllStudySession from "../Dashboard/AdminPage/ViewAllStudySession";
import ViewAllMetirial from "../Dashboard/AdminPage/ViewAllMetirial";
import CreateStudySession from "../Dashboard/TutorPage/CreateStudySession";
import ViewAllstudySessionTutor from "../Dashboard/TutorPage/ViewAllstudySessionTutor";
import UploadMetarial from "../Dashboard/TutorPage/UploadMetarial";
import ViewAllmeterial from "../Dashboard/TutorPage/ViewAllmeterial";
import ViewAllNotes from "../Dashboard/TutorPage/ViewAllNotes";
import ViewBookedSection from "../Dashboard/StudentPage/ViewBookedSession";
import CreateNotes from "../Dashboard/StudentPage/CreateNotes";
import ManagePersonalNotes from "../Dashboard/StudentPage/ManagePersonalNotes";
import ViewAllStudyMetarial from "../Dashboard/StudentPage/ViewAllStudyMetarial";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
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
        path: "/signin",
        element: <Login></Login>,
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
            path : "viewalluseradmin",
            element : <ViewAllUser></ViewAllUser>
        },
        {
            path : "viewallstudysessionadmin",
            element : <ViewAllStudySession></ViewAllStudySession>
        },
        {
            path : "viewallmetarialadmin",
            element : <ViewAllMetirial></ViewAllMetirial>
        },
        {
            path : "createstudysessiontutor",
            element : <CreateStudySession></CreateStudySession>
        },
        {
            path : "viewallstudysessiontutor",
            element : <ViewAllstudySessionTutor></ViewAllstudySessionTutor>
        },
        {
            path : "uploadmetarialtutor",
            element : <UploadMetarial></UploadMetarial>
        },
        {
            path : "viewallmetarialtutor",
            element : <ViewAllmeterial></ViewAllmeterial>
        },
        {
            path : "viewallnotestutor",
            element : <ViewAllNotes></ViewAllNotes>
        },
        {
            path : "bookedseddionstudent",
            element : <ViewBookedSection></ViewBookedSection>
        },
        {
            path : "createnotesstudent",
            element : <CreateNotes></CreateNotes>
        },
        {
            path : "managepersonalstudent",
            element : <ManagePersonalNotes></ManagePersonalNotes>
        },
        {
            path : "viewallstudymetrialstudent",
            element : <ViewAllStudyMetarial></ViewAllStudyMetarial>
        }
    ],
  },
  {
    path: "/success",
    element: <SucessesPay></SucessesPay>,
  },
]);
export default router;
