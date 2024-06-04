import { SiSololearn } from "react-icons/si";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="footer p-10 bg-base-200 text-base-content">
        <aside>
          <Link to="/" className="btn btn-ghost text-xl">
            {" "}
            <SiSololearn className="text-[25px]" />{" "}
            <p>
              <span className="text-green-400 text-[22px] font-[600]">T</span>
              eachable
            </p>
          </Link>
          <p>
            Learning Platform LTD.
            <br />
            Providing reliable tech since 2010
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Web Development</a>
          <a className="link link-hover">App Development</a>
          <a className="link link-hover">Digital Marketing</a>
          <a className="link link-hover">Desktop App Development</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">Netflix</a>
          <a className="link link-hover">Facebook</a>
          <a className="link link-hover">Youtube</a>
          <a className="link link-hover">Eset</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
