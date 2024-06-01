import { createBrowserRouter } from "react-router-dom";
import SucessesPay from "../PymentsSuccess";
import App from "../App";



const router = createBrowserRouter([
    {
        path : "/",
        element : <App></App>
    },
    {
        path : "/success",
        element : <SucessesPay></SucessesPay>
    }
])
export default router;