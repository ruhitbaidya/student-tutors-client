/* eslint-disable no-unused-vars */
import { useState } from "react";
import useQueryGetSecure from "../../Hooks/QueryGet/useQueryGetSecure";
import useSecureApi from "../../Hooks/SecureApi/useSecureApi";
import useUserContext from "../../Hooks/UserContext/useUserContext";

const ViewAllstudySessionTutor = () => {
  const [fedback, setFedback] = useState("");
  const { user } = useUserContext();
  const [secureData, refetch] = useQueryGetSecure(`/sessionfind/${user.email}`);
  const secureApiCall = useSecureApi();

  const handelRejected = (id) => {
    secureApiCall
      .patch(`/statusChange/${id}`)
      .then((res) => {
        secureApiCall
          .delete(`/deleteFeedback/${id}`)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        refetch();
      })
      .catch((err) => console.log(err));
  };
  const handelFedbackshow = (id) => {
    document.getElementById("my_modal_12").showModal();
    secureApiCall
      .get(`/showfeedback/${id}`)
      .then((res) => {
        if (res.data._id) setFedback(res?.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2 className="text-center text-3xl mb-[20px]">
        {" "}
        View All Session Approve And Rejected
      </h2>
      <div>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Tutor Name</th>
                  <th>Last Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {secureData &&
                  secureData?.data?.map((item) => {
                    return (
                      <tr key={item._id}>
                        <th>{item.sessionTitle}</th>
                        <th>{item.tutorName}</th>
                        <th>{item.regEndDate}</th>
                        <th>
                          {item.status === "approve" ? (
                            <span className="text-green-700">Approve</span>
                          ) : (
                            <>
                              <button
                                onClick={() => handelFedbackshow(item._id)}
                                className="text-red-700 mr-[10px]"
                              >
                                Reject and feedback
                              </button>
                              <button onClick={() => handelRejected(item._id)}>
                                Re Send Request
                              </button>{" "}
                            </>
                          )}
                        </th>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="my_modal_12" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{fedback?.rejectResone}</h3>
            <p className="py-4">{fedback?.rejectFeedback}</p>
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

export default ViewAllstudySessionTutor;
