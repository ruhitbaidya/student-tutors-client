import { useEffect, useState } from "react";
import usePullicApi from "../../../Hooks/publicApi/usePullicApi";
import { Link } from "react-router-dom";
import DateMatch from "../../../Hooks/DateMatch";

const SessionShow = () => {

  const [docCount, setDocCount] = useState(0);
  const [sesstion, setSessions] = useState([]);
  const publicApicall = usePullicApi();
  useEffect(() => {
    publicApicall
      .get("/getForeHome")
      .then((res) => {
        setSessions(res?.data?.result);
        setDocCount(res?.data?.counts);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [publicApicall]);
  console.log();

  return (
    <div className="my-[70px] px-[10px]">
      <div className="w-[100%] lg:w-[70%] mx-auto text-center mb-[50px]">
        <h2 className="text-[25px] font-[600] mb-[12px]">
          Embracing Serenity: A Journey to Inner Peace
        </h2>
        <p>
          Join us for a transformative session to achieve calm and tranquility
          through mindfulness, gentle meditation, and soothing techniques.
          Release stress, embrace serenity, and cultivate inner peace for
          lasting well-being in a serene escape
        </p>
        <hr className="w-[20%] mx-auto border border-gray-500 mt-[20px]" />
      </div>
      <div className="grid lg:grid-cols-3 gap-[30px]">
        {sesstion &&
          sesstion?.map((item) => {
            return (
              <div key={item._id} className="p-[15px] bg-gray-200 rounded-lg flex-col justify-between items-center">
                <div className="space-y-3">
                  <h2 className="text-2xl font-[600]">{item.sessionTitle}</h2>
                  <p>{item.sessionDescription.slice(0, 100)}</p>
                </div>
                <div className="mt-[20px]">
                  <button
                    disabled={DateMatch(item.regStartDate, item.regEndDate)}
                    className="py-[8px] rounded-full px-[20px] border border-gray-400 bg-gray-50 mr-[5px]"
                  >
                    {DateMatch(item.regStartDate, item.regEndDate ) ? "Closed" : "Ongoing"}
                  </button>
                  <Link to={`/details/${item._id}`}>
                    <button className="py-[8px] rounded-full px-[20px] border border-gray-400 bg-gray-50">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
      <div className="mt-[20px] text-center">
        {docCount > 6 ? (
          <Link to="/allSession">
          <button className="border py-[15px] px-[40px]">
            See All Session
          </button>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SessionShow;
