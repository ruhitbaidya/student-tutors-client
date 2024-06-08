
import AllTutors from "./AllTutors/AllTutors"
import Banner from "./Banner/Banner"
import SessionShow from "./SessionShow/SessionShow"


const Home = () => {
  return (
    <div className="container mx-auto">
        <Banner></Banner>
        <SessionShow></SessionShow>
        <AllTutors></AllTutors>
    </div>
  )
}

export default Home