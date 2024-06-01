import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import useUserContext from "../../Hooks/UserContext/useUserContext";
import UserSetRole from "../../Hooks/UsersetRouter/UserSetRouter";
import { Link } from "react-router-dom";
const Login = () => {
  const { loginuser, logingoogle, githublogin } = useUserContext();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    loginuser(email, password)
      .then((res) => {
        toast.success("successfully Login");
        console.log(res);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handelgooglelogin = () => {
    logingoogle()
      .then((res) => {
        if (res) {
          const user = {
            name: res?.user?.displayName,
            email: res?.user?.email,
            role: "student",
          };
          setTimeout(() => {
            UserSetRole(user)
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
          }, 1000);
          toast.success("successfully Login");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handelgithublogin = () => {
    githublogin()
      .then((res) => {
        if (res) {
          const user = {
            name: res?.user?.displayName,
            email: res?.user?.email,
            role: "student",
          };
          setTimeout(() => {
            UserSetRole(user)
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
          }, 1000);
          toast.success("successfully Login");
        }

        console.log(res);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className="my-[50px]">
      <div className="container mx-auto">
        <ToastContainer />
        <div className="w-[50%] mx-auto">
          <h2 className="text-[25px] font-[700] text-center mb-[20px]">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Enter Your Email</span>
                </div>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Enter Your Password</span>
                </div>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Enter Your Password"
                  className="input input-bordered w-full"
                />
              </label>
            </div>

            <div className="mt-[20px]">
              <button className="w-full py-[10px] border rounded-lg">
                Login
              </button>
            </div>
          </form>
          <div className="mt-[25px] text-center">
            <button
              onClick={handelgooglelogin}
              className="w-full py-[10px] border rounded-lg flex justify-center items-center gap-[10px]"
            >
              <FaGoogle />
              <span>Google Login</span>
            </button>
            <button
              onClick={handelgithublogin}
              className="w-full py-[10px] border rounded-lg flex justify-center items-center gap-[10px] mt-[10px]"
            >
              <FaGithub />
              <span>Github Login</span>
            </button>
          </div>
          <p>If You Hanve No Acount <Link to='/register'>Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
