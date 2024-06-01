import { useForm } from "react-hook-form"
import useUserContext from "../../Hooks/UserContext/useUserContext";
import { ToastContainer, toast } from 'react-toastify';
import UserSetRole from "../../Hooks/UsersetRouter/UserSetRouter";
import { Link } from "react-router-dom";

const Register = () => {
    const { registerEmailpass , updateUserProfile } = useUserContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) => {
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const role = data.role;
        console.log(name, email, password, role)
        registerEmailpass(email, password)
        .then((res)=> {
            console.log(res)
            updateUserProfile(name)
            .then((res)=>{
                console.log(res)
                UserSetRole({name, email, role})
                .then((res)=> {
                  console.log(res)
                })
                .catch((err)=> console.log(err))
                toast.success("Successfully Register")
            })
        })
        .catch((err)=> console.log(err))
      }
    
  return (
    <div className="my-[50px]">
      <div className="container mx-auto">
        <ToastContainer />
        <div className="w-[50%] mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Enter Your Name *</span>
                </div>
                <input
                required
                {...register("name")}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Enter Your Email *</span>
                </div>
                <input
                required
                {...register("email")}
                  type="email"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Enter Your Password *</span>
                </div>
                <input
                required
                {...register("password")}
                  type="password"
                  placeholder="******"
                  className="input input-bordered w-full "
                />
              </label>
            </div>
            <div className="mt-[10px]">
            <span className="label-text">Select Your Role *</span>
              <select {...register("role", { required: true })} className="select select-bordered w-full">
                <option value="" selected disabled>
                  --select--
                </option>
                <option value="admin">Admin</option>
                <option value="tutor">Tutor</option>
                <option value="student">Student</option>
               
              </select>
              {errors.role && <span className="text-red-500">This field is required</span>}
            </div>
            
            <div className="mt-[20px]">
              <button className="w-full py-[10px] border rounded-lg">Register</button>
            </div>
          </form>
          <p>If You Hanve Already An Acount <Link to='/signin'>Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
