import { useLocation, useNavigate } from "react-router-dom";
import useQueryGetSecure from "../../Hooks/QueryGet/useQueryGetSecure";
import { useEffect, useState } from "react";
import DateMatch from "../../Hooks/DateMatch";
import Swal from "sweetalert2";
import useUserContext from "../../Hooks/UserContext/useUserContext";
import useSecureApi from "../../Hooks/SecureApi/useSecureApi";
import ReactStars from "react-rating-stars-component";
const SessionDetails = () => {
  const [reviLoading, setRevLoadin] = useState(false);
  const [stReiew, setStReview] = useState([]);
  const [rolecheck, setRolecheck] = useState(true);
  const secureApiCall = useSecureApi();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [detailsdata, setDetailsData] = useState("");
  const id = useLocation();
  const ids = id.pathname.split("/")[2];
  const [secureData] = useQueryGetSecure(`/sessionDetails/${ids}`);

  useEffect(() => {
    setRevLoadin(true);
    secureApiCall
      .get(`checkRole/${user?.email}`)
      .then((res) => setRolecheck(res.data.roles))
      .catch((err) => console.log(err));
    setDetailsData(secureData?.data);
  }, [secureData, secureApiCall, user]);
  secureApiCall
    .get(`/getallreview/${detailsdata?._id}`)
    .then((res) => {
      setRevLoadin(false);
      setStReview(res?.data);
    })
    .catch((err) => console.log(err));
  console.log(detailsdata);
  const handelpayment = (price, id, email) => {
    if (price > 0) {
      localStorage.setItem("price", price);
      localStorage.setItem(
        "cId",
        JSON.stringify({
          mySessionId: id,
          myEmail: user.email,
          sessionTutor: email,
        })
      );
      navigate("/payment");
    } else {
      secureApiCall
        .post("/bookedSession", {
          mySessionId: id,
          myEmail: user.email,
          sessionTutor: email,
        })
        .then((res) => {
          console.log(res);
          Swal.fire("You SuccessFully Booked This Session");
          localStorage.removeItem("price");
          localStorage.removeItem("cId");
        })
        .catch((err) => console.log(err));
    }
  };
  const ratingAvarage = stReiew?.reduce((a, b) => a + b.ratings, 0);
  console.log(ratingAvarage);
  if (rolecheck === "student") {
    setRolecheck(false);
  }
  return (
    <div className="my-[50px] px-[10px]">
      <div>
        <h2 className="text-center text-3xl font-[700]">Session Details</h2>
        <div className="lg:w-[70%] mx-auto p-[20px] border mt-[20px] space-y-6">
          <p className="text-center font-[600] text-2xl">
            Tutor : {detailsdata?.tutorName}
          </p>
          <div className="lg:flex gap-[30px] items-center">
            <div className="flex-1 text-center mb-[30px]">
              <h2 className="text-3xl font-[600] mb-[20px]">Bye This Cource on Time</h2>
              <button
                onClick={() =>
                  handelpayment(
                    detailsdata?.registerFree,
                    detailsdata?._id,
                    detailsdata?.tutorEmail
                  )
                }
                disabled={
                  rolecheck ||
                  DateMatch(detailsdata?.regStartDate, detailsdata?.regEndDate)
                    ? true
                    : false
                }
                className="py-[8px] px-[30px] border border-gray-400 bg-gray-50 mr-[5px]"
              >
                {DateMatch(detailsdata?.regStartDate, detailsdata?.regEndDate)
                  ? "Close"
                  : "Book Now"}
                    <span className="pl-[5px]">${detailsdata?.registerFree}</span>
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl  font-[600]">
                {detailsdata?.sessionTitle}
              </h2>
              <p className="mt-[10px] text-1xl">
                {detailsdata?.sessionDescription}
              </p>
            </div>
          </div>

          <div className="flex gap-[30px]">
            <p className="bg-green-400 flex-1 p-[8px] text-white">
              Registration Start : {detailsdata?.regStartDate}
            </p>
            <p className="bg-red-400 flex-1 text-white p-[8px]">
              Registration End :{detailsdata?.regEndDate}
            </p>
          </div>
          <div className="flex gap-[30px]">
            <p className="bg-green-400 flex-1 p-[8px] text-white">
              Class Start :{detailsdata?.classStateDate}
            </p>
            <p className="bg-red-400 flex-1 text-white p-[8px]">
              Class End :{detailsdata?.classEndDate}
            </p>
          </div>

          <p className="bg-green-400 p-[8px] text-white text-center font-[600] text-2xl">Class Duration : {detailsdata?.classDuration}</p>

          <p className="bg-green-400 p-[8px] text-white text-center font-[600] text-2xl">Rating : {ratingAvarage / 5}</p>
        </div>
      </div>
      {/* all review session */}

      <div className="w-[70%] mx-auto">
        <h2 className="text-3xl font-[700] mt-[30px]">All Review</h2>
        <div>
          <div>
            {reviLoading ? (
              <p>Loading....</p>
            ) : (
              stReiew &&
              stReiew?.map((item) => {
                return (
                  <div key={item._id} className="border mt-[20px] p-[20px]">
                    <p>{item.review}</p>
                    <p>
                      <ReactStars
                        value={item.ratings}
                        count="5"
                        size={20}
                        activeColor="#ffd700"
                        edit={false}
                      />
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
