import { Link } from "react-router-dom";
import useQueryGetPublic from "../../../Hooks/QueryGet/useQueryGet";
import DateMatch from "../../../Hooks/DateMatch";

const Allsession = () => {
    const [publicData] = useQueryGetPublic("/getallsession");

    console.log(publicData)
  return (
    <div className="container mx-auto my-[50px]">
        <div>
            <h2 className="text-4xl font-[600] text-center mb-[50px]">See All Session</h2>
        </div>
        <div className="grid grid-cols-3 gap-[30px]">
            {
            publicData?.data?.map((item)=>{
                return   <div key={item._id} className="p-[15px] bg-gray-200 rounded-lg">
                <div className="space-y-3">
                  <h2 className="text-2xl font-[600]">{item.sessionTitle}</h2>
                  <p>{item.sessionDescription}</p>
                </div>
                <div className="mt-[20px]">
                  <button
                    disabled={DateMatch(item.regStartDate, item.regEndDate)}
                    className="py-[8px] px-[20px] border border-gray-400 bg-gray-50 mr-[5px]"
                  >
                    {DateMatch(item.regEndDate) ? "Closed" : "Ongoing"}
                  </button>
                  <Link to={`/details/${item._id}`}>
                    <button className="py-[8px] px-[20px] border border-gray-400 bg-gray-50">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            })
            }
        </div>
    </div>
  )
}

export default Allsession