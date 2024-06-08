import { Link, useLocation } from "react-router-dom"
import useQueryGetSecure from "../../Hooks/QueryGet/useQueryGetSecure";
import { useEffect, useState } from "react";

const ShowAllMetrial = () => {
    const [metrials, setMetrials] = useState([])
    const ids = useLocation();
    const setIds = ids.pathname.split("/")[3]
    const [secureData] = useQueryGetSecure(`getMetrialsAll/${setIds}`);
    useEffect(()=>{
        setMetrials(secureData?.data)
    }, [secureData])
    console.log(secureData?.data)
    
  return (
    <div>
        <div>
            <div className="grid grid-cols-2 gap-[30px]">
                {
                    metrials?.length > 0 ? metrials?.map((item)=>{
                        return <div key={item._id} className="bg-gray-300 p-[20px] rounded-lg space-y-4">
                            <div>
                                <img className="h-[200px] object-cover w-full rounded-lg" src={item.imageurl} alt="" />
                            </div>
                            <div>
                                <Link to={item.links}>Google Links Click Here</Link>
                            </div>
                            <div>
                                <button className="border py-[12px] px-[30px]">Download</button>
                            </div>
                        </div>
                    }) : <p className="text-center text-4xl font-[600]">No Metrial Found Here</p>
                }
            </div>
        </div>
    </div>
  )
}

export default ShowAllMetrial