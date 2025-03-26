import { SiSololearn } from "react-icons/si";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center space-x-2">
            <SiSololearn className="text-3xl text-indigo-500" />
            <span className="text-2xl font-bold text-white">
              <span className="text-indigo-400">T</span>eachable
            </span>
          </Link>
          <p className="text-gray-400">
            Empowering learners worldwide with quality education since 2015.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaFacebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Services Column */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Our Courses</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Web Development
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Mobile App Development
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Data Science
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                UI/UX Design
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/tutors"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Our Tutors
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} Teachable Learning Platform. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
