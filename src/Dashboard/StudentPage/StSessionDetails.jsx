import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useUserContext from "../../Hooks/UserContext/useUserContext";
import useSecureApi from "../../Hooks/SecureApi/useSecureApi";
import ReactStars from "react-rating-stars-component";

const StSessionDetails = () => {
  const { user } = useUserContext();
  const secureApiCall = useSecureApi();
  const [rating, setRating] = useState(0);
  const [details, setDetails] = useState("");
  const datas = useLoaderData();
  useEffect(() => {
    setDetails(datas?.data);
  }, [datas]);
  console.log(datas.data);

  const handelReview = (e) => {
    e.preventDefault();
    const reviewSessionId = datas.data._id;
    const ratings = rating;
    const review = e.target.review.value;
    const studentEmail = user.email;
    const revies = { reviewSessionId, ratings, review, studentEmail };
    console.log({ reviewSessionId, ratings, review, studentEmail });
    secureApiCall
      .post("/reviewall", revies)
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Your Review Add Successfully");
          setRating(0);
          e.target.reset();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  return (
    <div>
      <div className="bg-white p-[30px] rounded-lg">
        <div>
          <ToastContainer />
          <h2 className="text-center text-3xl font-[700]">
            {details.sessionTitle}
          </h2>
          <p className="lg:text-2xl text-center mt-[20px]">
            {details.sessionDescription}
          </p>
          <div className="flex justify-between items-center mt-[30px]">
            <p>Class Start : {details.classStateDate}</p>
            <p>Class Start : {details.classEndDate}</p>
          </div>
          <p className="mt-[30px]">Class Duration : {details.classDuration}</p>
        </div>
        <div className="mt-[100px]">
          <div className="">
            <div>
              <h2 className="text-center text-3xl font-[600]">Review This Course</h2>
            </div>
            <div className="vertical-rating flex justify-center items-center mb-[30px]">
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={30}
                isHalf={true}
                activeColor="#ffd700"
              />
              {/* set initial value */}
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
