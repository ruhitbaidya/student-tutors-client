import { Link } from "react-router-dom";
import useQueryGetSecure from "../../Hooks/QueryGet/useQueryGetSecure"
import useSecureApi from "../../Hooks/SecureApi/useSecureApi";
import useUserContext from "../../Hooks/UserContext/useUserContext"


const ViewAllmeterial = () => {
  const secureApiCall = useSecureApi();
  const {user} = useUserContext();
  const [secureData, refetch] = useQueryGetSecure(`/metrialuploadshow/${user.email}`)
  const handelMetrialdelete = (id)=>{
    console.log(id)
    secureApiCall.delete(`/deleteMetrial/${id}`)
    .then((res)=>{ 
      console.log(res);
      refetch();
    })
    .catch((err)=> console.log(err))
  }
  return (
    <div className="grid lg:grid-cols-2 gap-[30px]">
        {
          secureData && secureData?.data?.map((item)=>{
              return <div key={item._id} className="bg-white p-[10px] space-y-3 rounded-lg">
                    <div>
                      <img className="h-40 w-full object-cover" src={item.imageurl} alt="" />
                    </div>
                    <div>
                      <h2>{item.title}</h2>
                      <p> <Link to={item.links} target="_blank">View Link</Link> </p>
                    </div>
                    <div>
                      <Link to={`/dashboard/tutorUpdatemetrial/${item._id}`}>
                      <button className="btn btn-primary">Update</button>
                      </Link>
                      <button onClick={()=> handelMetrialdelete(item._id)} className="btn btn-warning ml-[10px]">Delete</button>
                    </div>
                 </div>
          })
        }
    </div>
  )
}

export default ViewAllmeterial