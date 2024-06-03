import { useEffect, useState } from "react"
import useQueryGetSecure from "../../Hooks/QueryGet/useQueryGetSecure"
import useSecureApi from "../../Hooks/SecureApi/useSecureApi";



const ViewAllMetirial = () => {
  const [metrial, setMetrial] = useState([])
  const [secureData, refetch] = useQueryGetSecure("/getallmetrial");
  const secureApiCall = useSecureApi();
  useEffect(()=>{
      setMetrial(secureData?.data)
  }, [secureData])
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
    <div className="grid grid-cols-2 gap-[30px]">
      {
        metrial && metrial?.map((item)=>{
          return <div key={item._id} className="bg-white p-[10px] space-y-3 rounded-lg">
          <div>
            <img className="h-40 w-full object-contain" src={item.imageurl} alt="" />
          </div>
          <div>
            <h2>{item.title}</h2>
            <p>{item.links}</p>
          </div>
          <div>
            <button onClick={()=> handelMetrialdelete(item._id)} className="btn btn-warning ml-[10px]">Remove</button>
          </div>
       </div>
        })
      }
    </div>
  )
}

export default ViewAllMetirial