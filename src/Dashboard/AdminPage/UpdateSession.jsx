import { useEffect, useState } from "react";
import useQueryGetSecure from "../../Hooks/QueryGet/useQueryGetSecure";
import useSecureApi from "../../Hooks/SecureApi/useSecureApi";
import { ToastContainer, toast } from 'react-toastify';
const UpdateSession = ({ valueId }) => {
  const [session, setSession] = useState({});
  const [secureData] = useQueryGetSecure(`/getsession/${valueId}`);
  console.log(secureData);
  const secureApiCall = useSecureApi();
  useEffect(() => {
    setSession(secureData?.data);
  }, [secureData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const sessionTitle = form.sessionTitle.value;
    const sessionDescription = form.sessionDescription.value;
    const regStartDate = form.regStartDate.value;
    const regEndDate = form.regEndDate.value;
    const classStateDate = form.classStateDate.value;
    const classEndDate = form.classEndDate.value;
    const classDuration = form.classDuration.value;
    const datas = {sessionTitle, sessionDescription,regStartDate,regEndDate,classStateDate,classEndDate,classDuration}
    console.log({sessionTitle, sessionDescription,regStartDate,regEndDate,classStateDate,classEndDate,classDuration});
      secureApiCall.post(`/updateadminsession/${valueId}`, datas)
      .then((res)=> {
        if(res.data.modifiedCount > 0){
            toast.success("Successfylly Update")
            form.reset();
        }
      })
      .catch((err)=> console.log(err))
  };
  return (
    <div>
      {" "}
      <div>
        <ToastContainer />
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              {valueId}
              <div>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Session Title</span>
                  </div>
                  <input
                    defaultValue={session?.sessionTitle}
                    
                    name="sessionTitle"
                    type="text"
                    placeholder="Session Title"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
              <div>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Session Description</span>
                  </div>
                  <textarea
                    defaultValue={session?.sessionDescription}
                    name="sessionDescription"
                    
                    className=" border rounded-lg p-[15px]"
                    placeholder="Session Description"
                    id=""
                    rows={3}
                  ></textarea>
                </label>
              </div>
              <div className="flex justify-between items-center gap-[30px]">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Register Start Date</span>
                  </div>
                  <input
                    defaultValue={session?.regStartDate}
                    name="regStartDate"
                    
                    type="date"
                    placeholder="Session Title"
                    className="input input-bordered w-full"
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Register End Date</span>
                  </div>
                  <input
                    defaultValue={session?.regEndDate}
                    name="regEndDate"
                    
                    type="date"
                    placeholder="Session Title"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
              <div className="flex justify-between items-center gap-[30px]">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Class Start</span>
                  </div>
                  <input
                    defaultValue={session?.classStateDate}
                    name="classStateDate"
                    
                    type="date"
                    placeholder="Session Title"
                    className="input input-bordered w-full"
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Class End</span>
                  </div>
                  <input
                    defaultValue={session?.classEndDate}
                    name="classEndDate"
                    
                    type="date"
                    placeholder="Session Title"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
              <div>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Class Duration</span>
                  </div>
                  <input
                    defaultValue={session?.classDuration}
                    name="classDuration"
                    
                    type="number"
                    placeholder="Session Title"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
              <div className="mt-[20px]">
                <label className="form-control w-full">
                  <input
                    type="submit"
                    value="Submit"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSession;
