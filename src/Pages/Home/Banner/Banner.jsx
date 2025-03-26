import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="relative min-h-[500px] flex items-center justify-center bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
      }}
    >
      {/* Dark overlay with gradient for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-700/80 rounded-lg"></div>

      {/* Subtle pattern overlay for texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] rounded-lg"></div>

      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
        <div className="text-center">
          <p className="text-lg md:text-xl lg:text-2xl text-indigo-100 font-medium mb-6 leading-relaxed">
            Crafting Code - Your Path to Mastery in Web and App Development
            <br />
            <span className="text-white font-semibold">
              Learn, Build, Innovate with Us!
            </span>
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            We Teach{" "}
            <span className="text-indigo-200">
              <Typewriter
                words={[
                  "Web Development",
                  "App Development",
                  "Digital Marketing",
                  "Desktop Development",
                ]}
                loop={100}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </h1>

          <div className="mt-12">
            <Link
              to="/allSession"
              className="inline-flex items-center px-10 py-4 border-2 border-white text-lg font-semibold rounded-lg text-white bg-indigo-600/90 hover:bg-white hover:text-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
            >
              Explore Courses
              <svg
                className="ml-3 w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
