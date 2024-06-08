import { useLocation, useNavigate } from "react-router-dom";
import useQueryGetSecure from "../../Hooks/QueryGet/useQueryGetSecure";
import { useEffect, useState } from "react";
import DateMatch from "../../Hooks/DateMatch";
import Swal from "sweetalert2";
import useUserContext from "../../Hooks/UserContext/useUserContext";
import useSecureApi from "../../Hooks/SecureApi/useSecureApi";

const SessionDetails = () => {
  const [rolecheck, setRolecheck] = useState(true)
  const secureApiCall = useSecureApi();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [detailsdata, setDetailsData] = useState("");
  const id = useLocation();
  const ids = id.pathname.split("/")[2];
  const [secureData] = useQueryGetSecure(`/sessionDetails/${ids}`);
  useEffect(() => {
    secureApiCall.get(`checkRole/${user?.email}`)
    .then((res)=> setRolecheck(res.data.roles))
    .catch((err)=> console.log(err))
    setDetailsData(secureData?.data);
  }, [secureData, secureApiCall, user]);
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
  if(rolecheck === "student"){
    setRolecheck(false)
  }
  return (
    <div className="my-[50px]">
      <div>
        <h2 className="text-center text-3xl font-[700]">Session Details</h2>
        <div className="w-[70%] mx-auto p-[20px] border mt-[20px]">
          <h2 className="text-2xl text-center font-[600]">
            {detailsdata?.sessionTitle}
          </h2>
          <p className="mt-[10px] text-center text-1xl">
            {detailsdata?.sessionDescription}
          </p>
          <p>Tutor : {detailsdata?.tutorName}</p>

          <p>Rating</p>

          <p>Registration Start : {detailsdata?.regStartDate}</p>
          <p>Registration End :{detailsdata?.regEndDate}</p>
          <p>Class Start :{detailsdata?.classStateDate}</p>
          <p>Class End :{detailsdata?.classEndDate}</p>
          <p>Class Duration : {detailsdata?.classDuration}</p>
          <p>Price : {detailsdata?.registerFree}</p>
          <p>Student Review</p>
          <button
            onClick={() =>
              handelpayment(
                detailsdata?.registerFree,
                detailsdata?._id,
                detailsdata?.tutorEmail
              )
            }
            disabled={rolecheck}
            className="py-[8px] px-[20px] border border-gray-400 bg-gray-50 mr-[5px]"
          >
            {DateMatch(detailsdata?.regStartDate, detailsdata?.regEndDate)
              ? "Closed"
              : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
