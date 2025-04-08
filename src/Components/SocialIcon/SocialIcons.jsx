"use client";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaSquareWhatsapp, FaSquareTwitter } from "react-icons/fa6";
import { FaFacebookSquare, FaShareAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

const SocialShareIcons = ({ title, description }) => {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  // Prepare the shared text content
  const sharedText = `${title}${description ? ` - ${description}` : ""}`;
  const hashtags = ["ruhit", "shop", "medicines"];

  return (
    <div className="flex items-center gap-6 p-4 bg-white rounded-lg">
      <div className="text-gray-600 hover:text-blue-500 transition-colors">
        <FaShareAlt size={28} />
      </div>

      <div className="flex items-center gap-5">
        {/* Facebook */}
        <FacebookShareButton url={shareUrl} hashtag={`#${hashtags[0]}`}>
          <FaFacebookSquare
            size={32}
            className="text-[#1877F2] hover:text-[#166fe5] transition-colors"
          />
        </FacebookShareButton>

        {/* LinkedIn */}
        <LinkedinShareButton
          url={shareUrl}
          title={title}
          summary={description}
          source="Your Website Name"
        >
          <IoLogoLinkedin
            size={32}
            className="text-[#0077B5] hover:text-[#005f92] transition-colors"
          />
        </LinkedinShareButton>

        {/* Twitter */}
        <TwitterShareButton
          url={shareUrl}
          title={sharedText}
          hashtags={hashtags}
        >
          <FaSquareTwitter
            size={32}
            className="text-[#1DA1F2] hover:text-[#1a8cd8] transition-colors"
          />
        </TwitterShareButton>

        {/* WhatsApp */}
        <WhatsappShareButton url={shareUrl} title={sharedText} separator=" :: ">
          <FaSquareWhatsapp
            size={32}
            className="text-[#25D366] hover:text-[#1da851] transition-colors"
          />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default SocialShareIcons;
