import useQueryGetSecure from "../../Hooks/QueryGet/useQueryGetSecure";
import useUserContext from "../../Hooks/UserContext/useUserContext"


const ViewBookedSection = () => {
  const {user} = useUserContext();
  const [secureData] = useQueryGetSecure(`/allbooksession/${user.email}`);
  console.log(secureData)
  return (
    <div>

    </div>
  )
}

export default ViewBookedSection