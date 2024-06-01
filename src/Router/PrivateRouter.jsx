import { Navigate } from "react-router-dom";
import useUserContext from "../Hooks/UserContext/useUserContext"


const PrivateRouter = ({children}) => {
    const {user, loading} = useUserContext();
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

export default PrivateRouter