import { useForm } from "react-hook-form"
import useUserContext from "../../Hooks/UserContext/useUserContext";
import { ToastContainer, toast } from 'react-toastify';
import UserSetRole from "../../Hooks/UsersetRouter/UserSetRouter";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [btnLoading, setBtnLoading] = useState(false)
    const { registerEmailpass , updateUserProfile } = useUserContext();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm()
    const navigate = useNavigate();
      const onSubmit = (data) => {
        setBtnLoading(true)
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const role = data.role;
        const image = data.image;
        console.log(name, email, password, role, image[0])
        const form = new FormData();
        form.append("image", image[0])
        axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMage_API_KRY}`, form)
        .then((res)=>{
          const images = res?.data?.data?.display_url
          if(images){
            registerEmailpass(email, password)
            .then((res)=> {
                console.log(res)
                updateUserProfile(name, images)
                .then((res)=>{
                    console.log(res)
                    UserSetRole({name, email, role, images})
                    .then((res)=> {
                      if(res.data.insertedId){
                        toast.success("User Role Set")
                        reset();
                      }
                    })
                    .catch((err)=>  console.log(err))
                    toast.success("Successfully Register")
                    setBtnLoading(false);
                    navigate("/")
                    window.location.reload();
                })
            })
            .catch((err)=> toast.error(err.message))
          }
        })
        
      }
    
  return (
    <div className="my-[50px]">
      <div className="container mx-auto">
        <ToastContainer />
        <div className="w-[50%] mx-auto shadow-lg p-[30px] rounded-lg">
          <h2 className="text-center text-3xl font-[700]">Register</h2>
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

            <div className="mt-[10px]">
            <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Select Your Image</span>
                </div>
                <input
                required
                {...register("image")}
                  type="file"
                  className="input-bordered w-full "
                />
              </label>
            </div>
            
            <div className="mt-[20px]">
              <button className="w-full py-[10px] border rounded-lg">  {btnLoading ? <span className="loading loading-spinner loading-xs"></span> : 'Register' } </button>
            </div>
          </form>
          <p className="mt-[20px]">If You Hanve Already An Acount <Link to='/signin'>Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
