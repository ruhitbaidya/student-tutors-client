import { useEffect, useState } from "react";
import useQueryGetSecure from "../../Hooks/QueryGet/useQueryGetSecure";
import { FaSearch } from "react-icons/fa";
import useSecureApi from "../../Hooks/SecureApi/useSecureApi";
import Swal from "sweetalert2";
const ViewAllUser = () => {
  const [users, setUsers] = useState([]);
  const [pageLoad, setpageLoad] = useState(false);
  const [page, setPage] = useState(0);
  const [sentPage, setSendPage] = useState(0)
  const [secureData, refetch] = useQueryGetSecure(`/getAllUser/${sentPage}`);
  console.log(secureData)
  const secureApiCall = useSecureApi();
  useEffect(() => {
    setpageLoad(true)
    setUsers(secureData?.data);
    setPage(Math.ceil(secureData?.data?.counts / 6))
    if(secureData?.data){
      setpageLoad(false)
    }
  }, [secureData]);

  const handelSeachUser = (e) => {
    e.preventDefault();
    const searchdata = e.target.search.value;
    secureApiCall
      .get(`/userSearch/${searchdata}`)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };
  // const findRoole = (e, email)=>{
  //   console.log(e, email)
  // }
  const findRooleandchange = (role, email, id) => {
    console.log(role, email, id);
    Swal.fire({
      title: "Are you sure?",
      text: `You Change ${email || "First The Role In select Box"} role`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change It!",
    }).then((result) => {
      if (result.isConfirmed) {
        secureApiCall
          .patch(`/changeUserRole/${id}`, { role })
          .then((res) => {
            console.log(res);
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Update!",
                text: "Your Request Has Updated.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  console.log(users, page);
  
  const findsPage = Array.from({length : page}, (_,index)=> index + 1)
  console.log(findsPage)
  return (
    <div>
      <div>
        <div className="mb-[20px] flex gap-[30px]">
          <form className="w-[85%]" onSubmit={handelSeachUser}>
            <label className="input input-bordered flex items-center gap-2">
              <input
                name="search"
                type="text"
                className="grow"
                placeholder="Search"
              />
              <button>
                <FaSearch />
              </button>
            </label>
          </form>
          <div className="w-[15%]">
          <button onClick={()=> refetch()} className="btn w-full">Reset</button>
          </div>
        </div>
        <div>
          <div className="overflow-x-auto h-[60vh]">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users?.result?.length <= 0 && (
                  <div>
                    <p className="text-3xl text-center mt-[30px]">Not User Found</p>
                  </div>
                )}
                {users &&
                  users?.result?.map((item) => {
                    return (
                      <tr key={item._id}>
                        <th>{item.user.name}</th>
                        <th>{item.user.email}</th>
                        <th>
                          <select
                            onChange={(e) =>
                              findRooleandchange(
                                e.target.value,
                                item.user.email,
                                item._id
                              )
                            }
                            defaultValue={item.user.role}
                            className="select select-bordered w-full max-w-xs"
                          >
                            <option value="" selected disabled>
                              --select--
                            </option>
                            <option value="admin">Admin</option>
                            <option value="tutor">Tutor</option>
                            <option value="student">Student</option>
                          </select>
                        </th>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {
                  pageLoad && <div>
                    <div className="flex justify-center items-center h-[50vh]">
                    <div>
                    <span className="loading loading-ring loading-lg block"></span>
                    </div>
                    </div>
                  </div>
                }
          </div>

          <div>
            {/* paginations  */}

            {
              page > 0 &&  <div className="space-x-2 text-center">
              <button disabled={sentPage === 0 ? true : false} onClick={()=> setSendPage(sentPage - 1)} className="btn">Prev</button>
              {findsPage?.map((item, ind)=>{
                return <button onClick={()=> setSendPage(ind)} className={`${sentPage === ind ? "bg-gray-600 text-white" : "" } border-0 btn`} key={ind}>{item}</button>
              })}
              <button disabled={sentPage === page - 1 ? true : false} onClick={()=> setSendPage(sentPage + 1)} className="btn">Next</button>
            </div>
            }
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllUser;
