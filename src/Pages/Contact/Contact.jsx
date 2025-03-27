import { useForm } from "react-hook-form";
import { FaPaperPlane, FaUser, FaEnvelope, FaComment } from "react-icons/fa";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // Add your form submission logic here
    reset();
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
        Contact Us
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-indigo-400" />
            </div>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                errors.name
                  ? "border-red-500"
                  : "border-gray-300 focus:border-indigo-500"
              } focus:ring-2 focus:ring-indigo-200 placeholder-gray-400 transition-all`}
              placeholder="John Doe"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-indigo-400" />
            </div>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-indigo-500"
              } focus:ring-2 focus:ring-indigo-200 placeholder-gray-400 transition-all`}
              placeholder="john@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3">
              <FaComment className="text-indigo-400" />
            </div>
            <textarea
              id="message"
              rows="5"
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters",
                },
              })}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                errors.message
                  ? "border-red-500"
                  : "border-gray-300 focus:border-indigo-500"
              } focus:ring-2 focus:ring-indigo-200 placeholder-gray-400 transition-all`}
              placeholder="Your message here..."
            ></textarea>
          </div>
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <FaPaperPlane />
          <span>Send Message</span>
        </button>
      </form>
    </div>
  );
};

export default Contact;
