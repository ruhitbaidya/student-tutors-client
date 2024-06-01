
import useQueryGetSecure from "../../Hooks/QueryGet/useQueryGetSecure";
import useSecureApi from "../../Hooks/SecureApi/useSecureApi";
import useUserContext from "../../Hooks/UserContext/useUserContext";

const ViewAllstudySessionTutor = () => {
  const { user } = useUserContext();
  const [secureData, refetch] = useQueryGetSecure(`sessionfind/${user.email}`);
  const secureApiCall = useSecureApi();

  const handelRejected = (id)=>{
      secureApiCall.patch(`/statusChange/${id}`)
      .then((res)=> refetch())
      .catch((err)=> console.log(err))
  }
  console.log(secureData);
  return (
    <div>
      <h2 className="text-center text-3xl mb-[20px]"> View All Session Approve And Rejected</h2>
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
                  { secureData &&  secureData?.data?.map((item)=>{
                    return <tr key={item._id}>
                    <th>{item.sessionTitle}</th>
                    <th>{item.tutorName}</th>
                    <th>{item.regEndDate}</th>
                    <th>{
                      item.status === "approve" ? <span className="text-green-700">Approve</span> : <button  onClick={()=> handelRejected(item._id)} className="text-red-700">Rejected</button>
                      }</th>
                  </tr>
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllstudySessionTutor;
