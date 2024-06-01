import useQueryGetSecure from "../Hooks/QueryGet/useQueryGetSecure"
import useUserContext from "../Hooks/UserContext/useUserContext";


const TutorPageProtact = () => {
    const {user} = useUserContext();
    const [secureData] = useQueryGetSecure(`checkRole/${user.email}`);

    console.log(secureData)

  return (
    <div>TutorPageProtact</div>
  )
}

export default TutorPageProtact