import PlatformSection from "./AboutFetchers/AboutFe";
import AllTutors from "./AllTutors/AllTutors";
import Banner from "./Banner/Banner";
import Blogs from "./Blogs/Blogs";
import Category from "./Category/Category";
import SessionShow from "./SessionShow/SessionShow";
import StudentReviews from "./StudentReview/StudentReview";
import Subscribe from "./Subscribe/Subscribe";

const Home = () => {
  return (
    <div className="container mx-auto">
      <Banner></Banner>
      <PlatformSection />
      <SessionShow></SessionShow>
      <Category />
      <Blogs />
      <AllTutors></AllTutors>
      <Subscribe />
      <StudentReviews />
    </div>
  );
};

export default Home;
