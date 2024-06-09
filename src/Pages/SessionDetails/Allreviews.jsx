import ReactStars from "react-rating-stars-component";
import useSecureApi from "../../Hooks/SecureApi/useSecureApi";
import { useEffect, useState } from "react";

const Allreviews = ({ id }) => {
  const secureApiCall = useSecureApi();
  const [reviLoading, setRevLoadin] = useState(false);
  const [stReiew, setStReview] = useState([]);
  useEffect(() => {
    setRevLoadin(true);
    secureApiCall
      .get(`/getallreview/${id}`)
      .then((res) => {
        setStReview(res?.data);
        setRevLoadin(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const findStar = () => {
    const ratingStars = stReiew.reduce((a, b) => {
      const sum = a + b.ratings;
      return sum;
    }, 0);

    const ratings = (ratingStars / stReiew.length).toFixed(1);
    if(ratings === "NaN"){
        return 0
    }else{
        return ratings
    }
   
  };

  console.log(findStar());
  return (
    <div>
      <div className="w-[70%] mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-[700] mt-[30px]">All Review</h2>
          <p>Rating : {findStar() || 0}</p>
        </div>
        <div>
          <div>
            {reviLoading ? (
              <p className="text-center text-2xl font-[600]">Loading....</p>
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

export default Allreviews;
