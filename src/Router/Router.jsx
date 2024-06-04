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
import ViewAllNotes from "../Dashboard/TutorPage/ViewAllNotes";
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
      {
        path: "/details/:id",
        element: (
          <PrivateRouter>
            <SessionDetails></SessionDetails>
          </PrivateRouter>
        ),
      },
      {
        path : "/allSession",
        element : <Allsession></Allsession>
      },
      {
        path : "/payment",
        element : <PrivateRouter>
          <YourPayment></YourPayment>
        </PrivateRouter>
      }
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
        path: "viewallnotestutor",
        element: (
          <TutorPageProtact>
            <ViewAllNotes></ViewAllNotes>
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
          return axios.get(`http://localhost:5000/getForUpdate/${params.id}`);
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
    ],
  },
]);
export default router;
