import { MdOutlineDateRange } from "react-icons/md";
import { SiLibreofficewriter } from "react-icons/si";
const blogPosts = [
  {
    id: 1,
    title: "Mastering JavaScript in 2025",
    description:
      "Learn the latest JavaScript features and best practices to level up your coding skills.",
    image:
      "https://www.sevenmentor.com/wp-content/uploads/2025/01/unnamed-2025-01-27T152049.354.jpg",
    author: "John Doe",
    date: "2025-03-20",
  },
  {
    id: 2,
    title: "10 Tips for Web Development Success",
    description:
      "Discover key strategies to become a better web developer in today's tech world.",
    image:
      "https://mytasker.com/blog/images/posts/21_web_design_tips_you_just_can_not_miss.JPG",
    author: "Jane Smith",
    date: "2025-03-18",
  },
  {
    id: 3,
    title: "React vs Vue: Which One to Choose?",
    description:
      "A detailed comparison of React and Vue.js to help you decide the best framework for your project.",
    image:
      "https://www.whitelotuscorporation.com/wp-content/uploads/2024/05/react_vs_vue.webp",
    author: "Alex Johnson",
    date: "2025-03-15",
  },
  {
    id: 4,
    title: "The Future of AI in Web Development",
    description:
      "Explore how artificial intelligence is shaping the future of web applications and development.",
    image:
      "https://media.designrush.com/articles/768225/conversions/The-Future-of-AI-in-Web-Development-Hero-preview.jpg",
    author: "Emily Brown",
    date: "2025-03-10",
  },
  {
    id: 5,
    title: "Top 5 CSS Tricks You Need to Know",
    description:
      "Enhance your styling skills with these must-know CSS techniques for modern web design.",
    image: "https://i.ytimg.com/vi/wfaDzSL6ll0/maxresdefault.jpg",
    author: "Michael Lee",
    date: "2025-03-05",
  },
  {
    id: 6,
    title: "How to Build a Full-Stack App with Next.js",
    description:
      "A step-by-step guide to creating a powerful full-stack application using Next.js and Node.js.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNOMyhaQCP6rlrFcE_uPSQBUrkKxaaW2pBdw&s",
    author: "Sophia Williams",
    date: "2025-03-01",
  },
];

const Blogs = () => {
  return (
    <div className="py-[50px]">
      <div className="mb-[20px] text-center">
        <h2 className="text-[25px] font-[600]">Blogs Posts</h2>
        <p>Choice your category cource and get more Tutors Cources</p>
      </div>
      <hr className="w-[20%] mx-auto border border-gray-500 mt-[10px]" />
      <div className="container mx-auto px-[10px] mt-[20px]">
        <div className="grid grid-cols-3 gap-[25px]">
          {blogPosts.map((item) => (
            <>
              <div className="border rounded-lg p-[10px]">
                <div>
                  <img
                    className="w-full h-[200px] object-cover"
                    src={item.image}
                    alt=""
                  />
                </div>
                <div className="my-[10px] space-y-7">
                  <div className="flex justify-between items-center">
                    <p className="flex justify-center items-center">
                      <MdOutlineDateRange />: {item.date}
                    </p>
                    <p className="flex justify-center items-center">
                      <SiLibreofficewriter />: {item.author}
                    </p>
                  </div>
                  <h3 className="font-bold text-1xl my-[5px]">{item.title}</h3>
                  <p>{item.description.slice(0, 60)}...</p>
                  <button className="text-blue-500 mt-[5px]">Read More</button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
