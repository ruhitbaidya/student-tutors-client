import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import usePullicApi from "../../../Hooks/publicApi/usePullicApi";

const StudentReviews = () => {
  const [review, setReview] = useState([]);
  const publicApicall = usePullicApi();
  useEffect(() => {
    publicApicall
      .get("/getallreviewPublic")
      .then((res) => setReview(res?.data))
      .catch((err) => console.log(err));
  }, [publicApicall]);
  console.log(review);
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Web Development Student",
      content:
        "The courses completely transformed my career. The platform is so intuitive and the instructors are incredibly knowledgeable. I landed my dream job within 3 months!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Data Science Student",
      content:
        "I've tried other platforms before, but the quality of content here is unmatched. The projects were especially valuable for building my portfolio.",
      rating: 4,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Design Student",
      content:
        "As a complete beginner, I was nervous about learning design. The structured curriculum and supportive community made all the difference. Highly recommend!",
      rating: 5,
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Digital Marketing Student",
      content:
        "The practical assignments helped me implement what I learned immediately in my business. Saw measurable results within weeks of starting the course.",
      rating: 5,
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-indigo-50 rounded-xl">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          What Our Students Say
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Hear from learners who transformed their skills and careers with our
          platform.
        </p>
        <div className="w-24 h-1 bg-indigo-600 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Swiper Slider */}
      <div className="pb-12">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-white p-8 rounded-xl shadow-md h-full flex flex-col">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 flex-grow">{review.content}</p>
                <div>
                  <h4 className="font-bold text-gray-800">{review.name}</h4>
                  <p className="text-indigo-600 text-sm">{review.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default StudentReviews;
