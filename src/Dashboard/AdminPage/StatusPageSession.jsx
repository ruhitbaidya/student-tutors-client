import { useState } from "react";
import useSecureApi from "../../Hooks/SecureApi/useSecureApi";
import UpdateSession from "./UpdateSession";
import { ToastContainer, toast } from 'react-toastify';
const StatusPageSession = ({ users, refetch }) => {
  const [handelbtn, sethandelBtn] = useState(false);
  const [ids, setIds] = useState("")
  const [formRject, setformReject] = useState(false)
  const [upid, setupid] = useState("");
  const [message, setMessage] = useState("");
  const secureApiCall = useSecureApi();
  const findRooleandchange = (tex, id) => {
    setMessage("");
    console.log(tex, id);
    sethandelBtn(false)
    setIds(id)
    if (tex === "approve") {
      document.getElementById("my_modal_1").showModal();
    } else if (tex === "rejected") {
      setformReject(false)
      document.getElementById("my_modal_6").showModal();
    } else {
      secureApiCall
        .patch(`/pedndinglist/${id}`)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            toast.success("Send Feedback")
            refetch();
          }
        })
        .catch((err) => console.log(err));
    }

    // secureApiCall
    //   .patch(`/sessionstatuschange/${id}`, { tex })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };

  const handelFeedBack = (e) => {
    e.preventDefault();
    const rejectResone = e.target.rejectResone.value;
    const rejectFeedback = e.target.rejectFeedback.value;
    const datas = { rejectResone, rejectFeedback, rejectSession: ids };
    secureApiCall
      .post("/rejectSessionFeedback", datas)
      .then((res) => {
        e.target.reset();
        console.log(res);
        if (res.data) {
          secureApiCall
            .patch(`/rejectlist/${ids}`)
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                setformReject(true)
                refetch();
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  const handelSesstionPrice = (e) => {
    e.preventDefault();
    const price = e.target.pricetext.value;
    console.log(ids, price)
    secureApiCall
      .patch(`/sessionstatuschange/${ids}`, { price })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          setMessage("Successfully Update");
          sethandelBtn(true)
          e.target.reset();
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const updateSession = (id) => {
    setupid(id);
    document.getElementById("my_modal_2").showModal();
  };
  const deleteSession = (id) => {
    secureApiCall
      .delete(`/deltesession/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          refetch();
        }
      })
      .catch((err) => console.log(err));
  };
  console.log(formRject)
  return (
    <div>
      <div>
        <ToastContainer />
        <h2 className="text-right">Total : {users?.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Title</th>
              <th>Reg Start</th>
              <th>Class Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((item) => {
                return (
                  <tr key={item._id}>
                    <th>{item.tutorName}</th>
                    <th>{item.tutorEmail}</th>
                    <th>{item.sessionTitle}</th>
                    <th>{item.regStartDate}</th>
                    <th>{item.classStateDate}</th>
                    {item?.status === "pending" && (
                      <th>
                        <select
                          onChange={(e) =>
                            findRooleandchange(e.target.value, item._id)
                          }
                          defaultValue={item.status}
                          className="select select-bordered w-full max-w-xs"
                        >
                          <option value="" selected disabled>
                            --select--
                          </option>
                          <option value="pending">Pending</option>
                          <option value="approve">Approve</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </th>
                    )}
                    {item?.status === "approve" && (
                      <th>
                        <button
                          onClick={() => updateSession(item._id)}
                          className="w-full py-[8px] px-[15px] bg-orange-400 text-white"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => deleteSession(item._id)}
                          className="w-full py-[8px] px-[15px] bg-red-400 mt-[5px] text-white"
                        >
                          Delete
                        </button>
                      </th>
                    )}
                    {item?.status === "rejected" && (
                      <span className="py-[5px] px-[12px] mt-[10px] block text-center text-white bg-red-400">
                        Rejected
                      </span>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {/* this modal user for price  */}
      <div>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-[20px]">
              Set The Session Price
            </h3>
            <div>
              <p>Set This Session Amount</p>
              <p className="text-[18px] font-[600] text-green-400">{message}</p>
              <form onSubmit={handelSesstionPrice}>
                <input
                required
                  name="pricetext"
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                <button disabled={handelbtn} className="btn btn-success text-white w-full mt-[20px]">
                  Save
                </button>
              </form>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn ml-[20px] bg-red-500 text-white">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      {/* this modal user for update session */}

      <div>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg mb-[20px]">Update Session Data</h3>
            <div>
              <UpdateSession valueId={upid} />
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn ml-[20px] bg-red-500 text-white">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="my_modal_6" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Send Reject Feedback</h3>

            <div>
              <form onSubmit={handelFeedBack}>
                <div>
                  <label className="form-control w-full ">
                    <div className="label">
                      <span className="label-text">Rejection reason</span>
                    </div>
                    <input
                      required
                      name="rejectResone"
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full "
                    />
                  </label>
                </div>
                <div>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Feedback</span>
                    </div>
                    <textarea
                      required
                      className="border-gray-300 border p-[10px] rounded-lg w-full"
                      name="rejectFeedback"
                      id=""
                      cols="30"
                      rows="4"
                    ></textarea>
                  </label>
                </div>
                <div className="mt-[20px]">
                  <button disabled={formRject}  className={` w-full py-[8px] border border-gray-400 rounded-lg`}>
                    Submit
                  </button>
                </div>
              </form>
            </div>

            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default StatusPageSession;
