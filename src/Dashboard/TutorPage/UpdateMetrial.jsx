import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import useSecureApi from "../../Hooks/SecureApi/useSecureApi";
import { useLoaderData } from "react-router-dom";

const UpdateMetrial = () => {
  const [pageload, setPageLoad] = useState(false);
  const {data} = useLoaderData();
  const secureApiCall = useSecureApi();
  console.log(data);
  const handelMeterialUpload = (e) => {
    e.preventDefault();
    setPageLoad(true);
    const title = e.target.title.value;
    const links = e.target.links.value;
    const image = e.target.image.value;
      const dataMeterial = {
        title: title,
        links: links,
        imageurl: image,
      };
      secureApiCall
        .patch(`/updateMertial/${data._id}`, dataMeterial)
        .then((res) => {
          setPageLoad(false);
          console.log(res);
          toast.success("Metrial Update");
        })
        .catch((err) => console.log(err));
  };
  return (
    <div>
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
                    defaultValue={data.title}
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
                  defaultValue={data.links}
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
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text">Pick a file</span>
                  </div>
                  <input
                   defaultValue={data.imageurl}

                    name="image"
                    type="text"
                    className="input input-bordered w-full"
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
    </div>
  );
};

export default UpdateMetrial;
