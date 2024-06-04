import { Navigate } from "react-router-dom";
import useUserContext from "../Hooks/UserContext/useUserContext";
import useQueryGetSecure from "../Hooks/QueryGet/useQueryGetSecure";


const ProvateDashboard = ({children}) => {
    const {user, loading} = useUserContext();
    const [secureData] = useQueryGetSecure(`checkRole/${user.email}`);
    const rulesdins = secureData?.data;
    console.log(rulesdins)
    if(loading){
        return <div className="h-[70vh] flex justify-center items-center">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    if(user){
        return children
    }

    return <Navigate to="/signin"></Navigate>
}

export default ProvateDashboard