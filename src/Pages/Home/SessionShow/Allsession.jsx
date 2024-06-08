import { Link } from "react-router-dom";
// import useQueryGetPublic from "../../../Hooks/QueryGet/useQueryGet";
import DateMatch from "../../../Hooks/DateMatch";
import { useEffect, useRef, useState } from "react";
import usePullicApi from "../../../Hooks/publicApi/usePullicApi";

const Allsession = () => {
  const [loading, setLoading] = useState(false)
  const [docCount, satDocCount] = useState([]);
  const btnRef = useRef(1)
  const [page, setPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const publicApicall = usePullicApi()
  useEffect(()=>{
    setLoading(true)
    publicApicall.get(`/getallsession/${currentPage}`)
    .then((res)=> {
      satDocCount(res?.data?.result)
      setPage(Math.ceil(res?.data?.documentCount / 6))
      setLoading(false)
    })
    .catch((err)=> console.log(err)) 

  }, [publicApicall, currentPage])

  const pages = Array.from({length : page}, (_,index)=> index + 1 );
  
  return (
    <div className="container mx-auto my-[50px]">
      <div>
        <h2 className="text-4xl font-[600] text-center mb-[50px]">
          See All Session
        </h2>
      </div>
      {loading ?  <><div className="h-[70vh] flex justify-center items-center"><span className="loading loading-dots loading-lg"></span></div></> : <div className="grid grid-cols-3 gap-[30px]">
        {docCount?.map((item) => {
          return (
            <div key={item._id} className="p-[15px] bg-gray-200 rounded-lg">
              <div className="space-y-3">
                <h2 className="text-2xl font-[600]">{item.sessionTitle}</h2>
                <p>{item.sessionDescription}</p>
              </div>
              <div className="mt-[20px]">
                <button
                  disabled={DateMatch(item.regStartDate, item.regEndDate)}
                  className="py-[8px] px-[20px] border border-gray-400 bg-gray-50 mr-[5px]"
                >
                  {DateMatch(item?.regStartDate, item?.regEndDate)
              ? "Close"
              : "Ongoing"}
                </button>
                <Link to={`/details/${item._id}`}>
                  <button className="py-[8px] px-[20px] border border-gray-400 bg-gray-50">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>}
      <div className="text-center mt-[30px]">
        <div className="">
          <button disabled={currentPage === 0 ? true : false} onClick={()=>setCurrentPage((current)=> current - 1)} ref={btnRef}  className="btn mr-[2px]">Prev</button>
          {
            pages.map((item, ind)=>{
                return <button ref={btnRef} onClick={()=>setCurrentPage(ind)} className={`btn mr-[2px] ${currentPage === ind ? "bg-gray-600 text-white" : ""}`}  key={ind}>
                    {item + ''}
                </button>
            })
          }
          <button disabled={ currentPage === page - 1 ? true : false} onClick={()=>setCurrentPage((current)=> current + 1)}  className="btn ml-[2px]">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Allsession;
