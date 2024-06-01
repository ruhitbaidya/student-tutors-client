import useQueryGetSecure from "../Hooks/QueryGet/useQueryGetSecure";
import useUserContext from "../Hooks/UserContext/useUserContext";

const AdminPageProtact = ({ children }) => {
  const { user, loading, logout } = useUserContext();
  const [secureData] = useQueryGetSecure(`checkRole/${user?.email}`);
  if (loading || !secureData) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

    if (user && secureData?.data?.roles === "admin") {
      return children;
    } else {
      logout();
    }
 
};

export default AdminPageProtact;
