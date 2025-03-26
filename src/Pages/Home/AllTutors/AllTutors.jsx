import { useEffect, useState } from "react";
import useQueryGetPublic from "../../../Hooks/QueryGet/useQueryGet";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { Link } from "react-router-dom";

const AllTutors = () => {
  const [alltutor, setAllTutor] = useState([]);
  const [publicData] = useQueryGetPublic("/getAllTutors");

  useEffect(() => {
    setAllTutor(publicData?.data);
  }, [publicData]);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Meet Our Expert Tutors
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Passionate educators dedicated to transforming learning with
          expertise, patience, and personalized approaches to ensure your
          academic success.
        </p>
        <div className="w-24 h-1 bg-indigo-600 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Swiper for Tutors */}
        <div className="w-full lg:w-1/2">
          <div className="hidden lg:block p-8">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="tutor-swiper"
            >
              {alltutor?.map((item) => (
                <SwiperSlide key={item._id}>
                  <div className="relative group overflow-hidden rounded-xl shadow-xl border-2 border-indigo-100">
                    <img
                      className="h-[400px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={item?.user?.images}
                      alt={item?.user?.name}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <h3 className="text-xl font-bold text-white">
                        {item?.user?.name}
                      </h3>
                      <p className="text-indigo-200 text-sm mt-1">
                        {item?.expertise || "Expert Educator"}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Tutor Description */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Discover Your Perfect Tutor
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {`Our tutors are more than just teachers - they're mentors who bring 
              years of experience, innovative teaching methods, and a genuine 
              passion for education. Each tutor is carefully selected for their 
              subject mastery and ability to connect with students.`}
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Whether you need help with academic subjects, test preparation, or
              skill development, our tutors provide personalized guidance to
              help you achieve your learning goals in a supportive environment.
            </p>
            <Link
              to="/tutors"
              className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
            >
              View All Tutors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTutors;
