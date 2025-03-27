import useSecureApi from "../../Hooks/SecureApi/useSecureApi";
import useUserContext from "../../Hooks/UserContext/useUserContext";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
const CreateStudySession = () => {
  const { user } = useUserContext();
  const secureApiCall = useSecureApi();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const session = {
      ...data,
      tutorName: user.displayName,
      tutorEmail: user.email,
      registerFree: 0,
      status: "pending",
    };

    secureApiCall
      .post("/createSession", session)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("successfully create Session");
          reset();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div>
        <ToastContainer />
        <div>
          <h2 className="text-center text-[25px] font-[700]">Create Session</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Session Title</span>
                </div>
                <input
                  {...register("sessionTitle")}
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
                  {...register("sessionDescription")}
                  className="rounded-lg p-[15px]"
                  placeholder="Session Description"
                  id=""
                  rows={5}
                ></textarea>
              </label>
            </div>
            <div className="lg:flex justify-between items-center gap-[30px]">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Register Start Date</span>
                </div>
                <input
                  {...register("regStartDate")}
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
                  {...register("regEndDate")}
                  type="date"
                  placeholder="Session Title"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <div className="lg:flex justify-between items-center gap-[30px]">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Class Start</span>
                </div>
                <input
                  {...register("classStateDate")}
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
                  {...register("classEndDate")}
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
                  {...register("classDuration")}
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
  );
};

export default CreateStudySession;
