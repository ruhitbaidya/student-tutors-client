import { useLocation } from "react-router-dom";
import useUserContext from "../../Hooks/UserContext/useUserContext";
import axios from "axios";
import useSecureApi from "../../Hooks/SecureApi/useSecureApi";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
const MetarialuploadPage = () => {
  const [pageload, setPageLoad] = useState(false);
  const { user } = useUserContext();
  const secureApiCall = useSecureApi();
  const sesionId = useLocation();
  const idsfind = sesionId.state;

  const handelMeterialUpload = (e) => {
    e.preventDefault();
    setPageLoad(true);
    const title = e.target.title.value;
    const links = e.target.links.value;
    const image = e.target.image.files[0];
    const formdata = new FormData();
    formdata.append("image", image);
    axios
      .post(
        `https://api.imgbb.com/1/upload?key=210b46352f7d1f16f91db247e7e12194`,
        formdata
      )
      .then((res) => {
        if (res.data.data.display_url) {
          const dataMeterial = {
            tutoremail: user.email,
            title: title,
            links: links,
            sessionId: idsfind,
            imageurl: res.data.data.display_url,
          };
          secureApiCall
            .post("/uploadMetrial", dataMeterial)
            // eslint-disable-next-line no-unused-vars
            .then((res) => {
              setPageLoad(false);

              toast.success("Metrial Add");
              e.target.reset();
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div>
        <ToastContainer />
        <div>
          <form onSubmit={handelMeterialUpload}>
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Title</span>
                </div>
                <input
                  name="title"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Google Drive Link</span>
                </div>
                <textarea
                  placeholder="Give Here Google Driver Link"
                  className="rounded-lg p-[10px] focus:outline-gray-400"
                  name="links"
                  id=""
                  cols="30"
                  rows="5"
                ></textarea>
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Pick a file</span>
                </div>
                <input
                  name="image"
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div className="mt-[20px]">
              <button className="w-full py-[10px] bg-white rounded-lg">
                {pageload ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MetarialuploadPage;
