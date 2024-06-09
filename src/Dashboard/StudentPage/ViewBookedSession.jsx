import { Link } from "react-router-dom";
import useQueryGetSecure from "../../Hooks/QueryGet/useQueryGetSecure";
import useUserContext from "../../Hooks/UserContext/useUserContext"


const ViewBookedSection = () => {
  const {user} = useUserContext();
  const [secureData] = useQueryGetSecure(`/allbooksession/${user.email}`);
  console.log(secureData)
  return (
    <div className="grid lg:grid-cols-2 gap-[30px]">
        {
          secureData?.data?.map((item)=> {
            return <div key={item._id} className="bg-gray-300 p-[20px] space-y-4 rounded-lg">
                <h2 className="text-2xl font-[600]">{item.sessionTitle}</h2>
                <p>{item.sessionDescription}</p>
                <p>{item.classDuration}</p>
                <p>{item.tutorName}</p>
                <Link to={`/dashboard/sessionDetailSt/${item._id}`}>
                <button className="btn w-full">View Details</button>
                </Link>
            </div>
          })
        }
    </div>
  )
}

export default ViewBookedSection