import { createBrowserRouter } from "react-router-dom";
import SucessesPay from "../PymentsSuccess";
import Root from "../Pages/Root/Root";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";



const router = createBrowserRouter([
    {
        path : "/",
        element : <Root></Root>,
        children : [
            {
                path : "/",
                element : <Home></Home>
            },
            {
                path : "/register",
                element : <Register></Register>
            },
            {
                path : "/signin",
                element : <Login></Login>
            }
        ]
    },
    {
        path : "/success",
        element : <SucessesPay></SucessesPay>
    }
])
export default router;