import { useForm } from "react-hook-form";
import usePullicApi from "../../../Hooks/publicApi/usePullicApi";
import { toast, ToastContainer } from "react-toastify";

const Subscribe = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const publicApicall = usePullicApi();
  const onSubmit = (data) => {
    publicApicall
      .post(`/subscribe`, data)
      .then((res) => {
        if (res.data) {
          reset();
          toast.success(res?.data?.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <ToastContainer />
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Stay Updated With Our Courses
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Subscribe to get the latest course updates and learning resources
        </p>
        <div className="w-24 h-1 bg-indigo-600 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Subscribe Box */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="hidden md:block">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
              alt="People learning together"
            />
          </div>

          {/* Form Section */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Join Our Learning Community
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  {...register("name", { required: true })}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  type="text"
                  placeholder="Your Name"
                  required
                />
                {errors.name && <span>This field is required</span>}
              </div>
              <div>
                <input
                  {...register("email", { required: true })}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  type="email"
                  placeholder="Your Email"
                  required
                />
                {errors.email && <span>This field is required</span>}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Subscribe Now
                  <svg
                    className="w-4 h-4 ml-2 inline"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </form>
            <p className="text-sm text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
