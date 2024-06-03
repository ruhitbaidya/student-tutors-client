import { useState } from "react";
import useSecureApi from "../../Hooks/SecureApi/useSecureApi";
import { ToastContainer, toast } from 'react-toastify';
import UpdateSession from "./UpdateSession";
const StatusPageSession = ({ users, refetch }) => {
  const [upid, setupid] = useState("")
  const [price, setprice] = useState(0)
  const secureApiCall = useSecureApi();
  let ids = "";
  const findRooleandchange = (tex, id) => {
    console.log(tex, id);
    ids = id;
    if (tex === "approve") {
      document.getElementById("my_modal_1").showModal();
    } else if (tex === "rejected") {
      secureApiCall
      .patch(`/rejectlist/${id}`)
      .then((res) => {
        if(res.data.modifiedCount > 0){
          toast.success("Add To Reject list")
          refetch();
          setprice(0);
        }
      })
      .catch((err) => console.log(err));
    }else{
      secureApiCall
      .patch(`/pedndinglist/${id}`)
      .then((res) => {
        if(res.data.modifiedCount > 0){
          toast.success("Add To panding list")
          refetch();
          setprice(0);
        }
      })
      .catch((err) => console.log(err));
    }
    console.log(price)
    // secureApiCall
    //   .patch(`/sessionstatuschange/${id}`, { tex })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };

  const handelSesstionPrice = () => {
    setprice(0);
    console.log(ids)
    let prices = document.getElementById("pricetext").value;
    setprice(prices)
    console.log(price);
        secureApiCall
      .patch(`/sessionstatuschange/${ids}`, { price })
      .then((res) => {
        if(res.data.modifiedCount > 0){
          toast.success("update successfully")
          refetch();
          setprice(0);
        }
        console.log(res)
      })
      .catch((err) => console.log(err));
  };


  const updateSession = (id)=>{
    setupid(id)
    document.getElementById("my_modal_2").showModal();
  }
  const deleteSession = (id)=>{
    secureApiCall
      .delete(`/deltesession/${id}`)
      .then((res) => {
        if(res.data.deletedCount > 0){
          toast.success("Delete successfully")
          refetch();
        }
      })
      .catch((err) => console.log(err));
  }
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
                    {
                      item?.status === "pending" && <th>
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
                    }
                    {
                      item?.status === "approve" && <th>
                        <button onClick={()=> updateSession(item._id)} className="btn bg-orange-400">Update</button>
                        <button onClick={()=> deleteSession(item._id)} className="btn bg-red-400 ml-[5px]">Delete</button>
                      </th>
                    }
                    {
                      item?.status === "rejected" && <span className="py-[5px] px-[12px] mt-[10px] block text-center text-white bg-red-400">Rejected</span>
                    }
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
              <input
              defaultValue={price}
                id="pricetext"
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
            <div className="modal-action">
              <form method="dialog">
               
                <button
                  onClick={handelSesstionPrice}
                  className="btn btn-success text-white"
                  type="button"
                >
                  Save
                </button>
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
            <h3 className="font-bold text-lg mb-[20px]">
              Update Session Data
            </h3>
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






    </div>
  );
};

export default StatusPageSession;
