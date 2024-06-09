import { Link } from "react-router-dom";
import useQueryGetSecure from "../../Hooks/QueryGet/useQueryGetSecure";
import useUserContext from "../../Hooks/UserContext/useUserContext";

const UploadMetarial = () => {
  const {user} = useUserContext();
  const [secureData] = useQueryGetSecure(`TutorOnlyApprove/${user?.email}`)
  return (
  <>
    <div className="grid lg:grid-cols-2 gap-[23px]">
    {
       secureData && secureData.data?.map((item)=>{
        return <div key={item._id} className="bg-white p-[20px] space-y-3 rounded-lg">
            <h2 className="text-[20px] font-[700]">{item?.sessionTitle}</h2>
            <p>{item?.sessionDescription}</p>
            <p>Email : {item?.tutorEmail}</p>
            <span className="mb-[10px]"><span className="font-[600]">Register Last Date :</span> {item?.regEndDate}</span> <br />
            <span><span className="font-[600]">Class Start Date :</span> {item?.classStateDate}</span>
            <p>Status : <span className="text-green-400 capitalize">{item.status}</span></p>
            <Link to="/dashboard/materialUpload" state={item._id}>
              <button className="btn w-full mt-[15px]"> upload material</button>
            </Link>
        </div>
      })
    }
    </div>
  </>
  );
};

export default UploadMetarial;
