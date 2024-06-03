import { useEffect, useState } from "react";
import useQueryGetSecure from "../../Hooks/QueryGet/useQueryGetSecure";
import { FaSearch } from "react-icons/fa";
import useSecureApi from "../../Hooks/SecureApi/useSecureApi";
import Swal from 'sweetalert2'
const ViewAllUser = () => {
  const [users, setUsers] = useState([]);
  const [secureData, refetch] = useQueryGetSecure("/getAllUser");
  const secureApiCall = useSecureApi();
  useEffect(() => {
    setUsers(secureData?.data);
  }, [secureData]);

  // const findRoole = (e, email)=>{
  //   console.log(e, email)
  // }
  const findRooleandchange = (role, email, id)=>{
    console.log(role,email, id)
    Swal.fire({
      title: "Are you sure?",
      text: `You Change ${email || "First The Role In select Box"} role`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change It!"
    }).then((result) => {
      if (result.isConfirmed) {
        secureApiCall.patch(`/changeUserRole/${id}`, {role})
        .then((res)=>{
          console.log(res)
          if(res.data.modifiedCount > 0){
            Swal.fire({
              title: "Update!",
              text: "Your Request Has Updated.",
              icon: "success"
            });
            refetch();
          }
        })
        .catch((err)=>{
          console.log(err)
        })
        
      }
    });
    
  }
  console.log(users);
  return (
    <div>
      <div>
        <div className="mb-[20px]">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <button>
              <FaSearch />
            </button>
          </label>
        </div>
        <div>
          <div className="overflow-x-auto">
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
                {users && users.map((item) => {
                  return (
                    <tr key={item._id}>
                      <th>{item.user.name}</th>
                      <th>{item.user.email}</th>
                      <th>
                        <select
                        onChange={(e)=> findRooleandchange(e.target.value, item.user.email, item._id)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllUser;
