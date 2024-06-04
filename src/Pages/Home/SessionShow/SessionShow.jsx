import { useEffect, useState } from "react";
import usePullicApi from "../../../Hooks/publicApi/usePullicApi";
import Curenttimes from "../../../Hooks/Curenttimes";
import { Link } from "react-router-dom";

const SessionShow = () => {
  const dates = Curenttimes();
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
  const matchDate = (endDate) => {
    if (new Date(dates) >= new Date(endDate)) {
      return true;
    }
  };
  return (
    <div className="my-[70px]">
      <div className="w-[70%] mx-auto text-center mb-[50px]">
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
      <div className="grid grid-cols-3 gap-[30px]">
        {sesstion &&
          sesstion?.map((item) => {
            return (
              <div key={item._id} className="p-[15px] bg-gray-200 rounded-lg">
                <div className="space-y-3">
                  <h2 className="text-2xl font-[600]">{item.sessionTitle}</h2>
                  <p>{item.sessionDescription}</p>
                </div>
                <div className="mt-[20px]">
                  <button
                    disabled={matchDate(item.regEndDate)}
                    className="py-[8px] px-[20px] border border-gray-400 bg-gray-50 mr-[5px]"
                  >
                    {matchDate(item.regEndDate) ? "Closed" : "Ongoing"}
                  </button>
                  <Link to="/details">
                    <button className="py-[8px] px-[20px] border border-gray-400 bg-gray-50">
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
          <button className="border py-[15px] px-[40px]">
            See All Session
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SessionShow;
