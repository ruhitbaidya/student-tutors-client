import { useEffect, useState } from "react";
import useQueryGetPublic from "../../../Hooks/QueryGet/useQueryGet";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
const AllTutors = () => {
  const [alltutor, setAllTutor] = useState([]);
  const [publicData] = useQueryGetPublic("/getAllTutors");

  useEffect(() => {
    setAllTutor(publicData?.data);
  }, [publicData]);

  console.log("alluser", alltutor);
  return (
    <div className="my-[50px] container mx-auto px-[10px]">
      <div>
        <div className="lg:w-[70%] mx-auto text-center mb-[50px]">
          <h2 className="text-[25px] font-[600] mb-[12px]">
            Meet Our All Tutors
          </h2>
          <p>
            experts in their fields, passionate about teaching, experienced,
            patient, approachable, dedicated to helping students excel,
            innovative, supportive, and committed to personalized learning
            success.
          </p>
          <hr className="w-[20%] mx-auto border border-gray-500 mt-[20px]" />
        </div>
        <div>
          <div className="grid lg:grid-cols-2 gap-[30px] items-center">
            <div>
              <div className="lg:p-[120px] hidden lg:block">
              <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
              >
                {
                    alltutor?.map((item)=>{
                        return <SwiperSlide key={item._id}>
                            <div className="border-2 border-blue-500 rounded-lg bg-white">
                                <img className="h-[350px] w-full object-cover rounded-lg" src={item?.user?.images} alt="" />
                                <h2 className="bg-white text-center text-[20px] font-[600] rounded-lg">{item?.user?.name}</h2>
                            </div>
                        </SwiperSlide>
                    })
                }
                
              </Swiper>
              </div>
            </div>
            <div>
              <h2 className="text-[22px] font-[600] mb-[20px]">
                Meet Our All Tutors Here
              </h2>
              <p className="text-justify">
                Meet our exceptional tutors: passionate educators dedicated to
                transforming learning. With expertise and patience, they inspire
                and support students, tailoring lessons to individual needs.
                Their innovative approach and commitment ensure every student
                excels, fostering confidence and academic success in a
                nurturing, engaging environment. Discover your potential with
                our outstanding tutors.
              </p>
              <button className="border py-[8px] px-[30px] mt-[20px]">
                View More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTutors;
