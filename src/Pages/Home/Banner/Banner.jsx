import { Typewriter } from "react-simple-typewriter";
import "./style.css";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="addBgImage">
      <div className="addcolors py-[150px]">
        <div className="lg:w-[70%] mx-auto">
          <p className="text-center lg:text-[20px] text-white mb-[20px]">
            Crafting Code Your Path to Mastery in Web and App Development <br />{" "}
            Learn, Build, Innovate with Us!
          </p>
          <h2 className="lg:text-[40px] text-white text-center font-[700] mb-[35px]">
            {" "}
            We are Teaching{" "}
            <Typewriter
              words={[
                "Web Development",
                "App Development",
                "Digital Marketing",
                "Desktop App Development",
              ]}
              loop={100}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h2>
          <div className="text-center">
            <Link to="/allSession">
              <button className="border py-[13px] px-[40px] hover:bg-white hover:text-gray-700 text-white">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
