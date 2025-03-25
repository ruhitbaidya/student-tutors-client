import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Programming",
    description: "Courses related to software development and coding.",
  },
  {
    id: 2,
    name: "Web Development",
    description: "Courses on front-end, back-end, and full-stack development.",
  },
  {
    id: 3,
    name: "Data Science",
    description: "Courses covering machine learning, AI, and analytics.",
  },
  {
    id: 4,
    name: "Business & Marketing",
    description:
      "Courses on digital marketing, entrepreneurship, and management.",
  },
  {
    id: 5,
    name: "Design & Creativity",
    description: "Courses on graphic design, UI/UX, and video editing.",
  },
  {
    id: 6,
    name: "Personal Development",
    description: "Courses on communication skills, productivity, and mindset.",
  },
];
const Category = () => {
  return (
    <div>
      <div className="mb-[20px] text-center">
        <h2 className="text-[25px] font-[600]">Cource Categori</h2>
        <p>Choice your category cource and get more Tutors Cources</p>
      </div>
      <hr className="w-[20%] mx-auto border border-gray-500 mt-[10px]" />
      <div className="container mx-auto px-[10px] mt-[20px]">
        <div className="grid grid-cols-3 gap-[25px]">
          {categories?.map((item) => (
            <>
              <Link to="">
                <div className="border p-[30px] relative">
                  <div>
                    <h2 className="font-bold text-2xl mb-[10px]">
                      {item?.name}
                    </h2>
                    <p className="font-bold">{item?.description}</p>
                  </div>
                  <div className="absolute opacity-0 hover:opacity-100 transition-[0.5s] top-0 bg-green-300 left-0 flex justify-center items-center w-full h-full">
                    <div className="text-center">
                      <h2 className="font-bold">{item.name}</h2>
                      <p>See More</p>
                    </div>
                  </div>
                </div>
              </Link>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
