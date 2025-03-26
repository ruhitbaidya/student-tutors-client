import ReactStars from "react-rating-stars-component";
import { useEffect, useState } from "react";
import useQueryGetPublic from "../../Hooks/QueryGet/useQueryGet";
import { FaUserCircle } from "react-icons/fa";

const Allreviews = ({ id }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publicData] = useQueryGetPublic(`/getallreview/${id}`);

  useEffect(() => {
    if (publicData?.data) {
      setReviews(publicData.data);

      // Calculate average rating
      if (publicData.data.length > 0) {
        const total = publicData.data.reduce(
          (sum, review) => sum + review.ratings,
          0
        );
        const avg = (total / publicData.data.length).toFixed(1);
        setAverageRating(avg);
      } else {
        setAverageRating(0);
      }

      setLoading(false);
    }
  }, [publicData]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Reviews Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
          Student Reviews
        </h2>
        <div className="flex items-center bg-indigo-50 px-4 py-2 rounded-lg">
          <span className="text-gray-700 mr-2 font-medium">
            Average Rating:
          </span>
          <span className="text-indigo-600 font-bold text-xl">
            {averageRating}
          </span>
          <ReactStars
            value={averageRating}
            count={5}
            size={20}
            edit={false}
            activeColor="#f59e0b"
            classNames="ml-2"
          />
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex items-start mb-4">
                <div className="mr-4">
                  <FaUserCircle className="text-4xl text-gray-400" />
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <ReactStars
                      value={review.ratings}
                      count={5}
                      size={20}
                      edit={false}
                      activeColor="#f59e0b"
                    />
                    <span className="ml-2 text-gray-600 text-sm">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.review}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">No reviews yet</p>
            <p className="text-gray-400 mt-2">
              Be the first to share your experience!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Allreviews;
