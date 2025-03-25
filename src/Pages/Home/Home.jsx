import AllTutors from "./AllTutors/AllTutors";
import Banner from "./Banner/Banner";
import Blogs from "./Blogs/Blogs";
import Category from "./Category/Category";
import SessionShow from "./SessionShow/SessionShow";
import Subscribe from "./Subscribe/Subscribe";

const Home = () => {
  return (
    <div className="container mx-auto">
      <Banner></Banner>
      <SessionShow></SessionShow>
      <Category />
      <Blogs />
      <AllTutors></AllTutors>
      <Subscribe />
    </div>
  );
};

export default Home;
