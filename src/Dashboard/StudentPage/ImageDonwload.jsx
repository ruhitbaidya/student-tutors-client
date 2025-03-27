import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const ImageDonwload = ({ image }) => {
  const [images, setImage] = useState();
  const imagePart = image.split("/");
  if (!image) {
    toast.error("Give Valid Image URL");
    return;
  }

  const handelImageDownload = async () => {
    try {
      const response = await fetch(image, {
        mode: "no-cors",
      });
      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));
    } catch (err) {
      console.log(err);
    }
  };
  handelImageDownload();
  return (
    <div className="mt-[30px]">
      <ToastContainer />
      <a
        className="cursor border border-gray-600 py-[12px] px-[30px] text-gray-900"
        href={images}
        download={imagePart[4]}
      >
        Download
      </a>
    </div>
  );
};

export default ImageDonwload;
