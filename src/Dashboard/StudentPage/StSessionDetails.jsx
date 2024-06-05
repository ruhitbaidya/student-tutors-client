import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Rating } from 'react-simple-star-rating';
import { ToastContainer, toast } from 'react-toastify';

import useUserContext from "../../Hooks/UserContext/useUserContext";
import useSecureApi from "../../Hooks/SecureApi/useSecureApi";

const StSessionDetails = () => {
  const {user} = useUserContext();
  const secureApiCall = useSecureApi();
  const [rating, setRating] = useState(0)
  const [details, setDetails] = useState("");
  const datas = useLoaderData();
  useEffect(() => {
    setDetails(datas?.data);
  }, [datas]);
  console.log(datas.data);
 

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate)
  }

  const handelReview = (e)=>{
    e.preventDefault();
    const reviewSessionId = datas.data._id;
    const ratings = rating;
    const review = e.target.review.value;
    const studentEmail = user.email;
    const revies = {reviewSessionId, ratings, review, studentEmail}
    console.log({reviewSessionId, ratings, review, studentEmail})
    secureApiCall.post("/reviewall", revies)
    .then((res)=>{
      if(res.data.acknowledged){
        toast.success("Your Review Add Successfully")
        setRating(0)
        e.target.reset()
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div>
      <div className="bg-white p-[30px] rounded-lg">
        <div>
          <ToastContainer />
          <h2 className="text-center text-3xl font-[700]">
            {details.sessionTitle}
          </h2>
          <p className="text-2xl text-center mt-[20px]">
            {details.sessionDescription}
          </p>
          <div className="flex justify-between items-center mt-[30px]">
            <p>Class Start : {details.classStateDate}</p>
            <p>Class Start : {details.classEndDate}</p>
          </div>
          <p className="mt-[30px]">Class Duration : {details.classDuration}</p>
        </div>
        <div className="mt-[50px]">
          <div className="">
            <div className="vertical-rating">
              {/* set initial value */}
              <Rating
                onClick={handleRating}
                initialValue={rating}
                transition
                showTooltip
                tooltipArray={[
                  "Terrible",
                  "Bad",
                  "Average",
                  "Great",
                  "Prefect",
                ]}
              />
            </div>
          </div>
          <div>
            <form onSubmit={handelReview}>
              <textarea
                className="w-full border-gray-400 border rounded-lg p-[15px]"
                name="review"
                id=""
                cols="30"
                placeholder="Write your Review"
                rows="5"
              ></textarea>
              <button className="w-full mt-[20px] py-[10px] border-2 rounded-lg border-gray-200">
                Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StSessionDetails;
