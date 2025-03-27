import { useForm } from "react-hook-form";
import {
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaComment,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaBuilding,
} from "react-icons/fa";
import { MdEmail, MdSupportAgent } from "react-icons/md";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // eslint-disable-next-line no-unused-vars
  const onSubmit = (data) => {
    reset();
  };

  return (
    <div className="bg-gray-50">
      {/* Top Section: Map + Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {` Have questions? We're here to help. Reach out to us anytime.`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
            <div className="h-96 w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.091870071241!2d91.70510327449586!3d24.3064252655035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37516ef7e5555555%3A0x9a911e4dfe37ff19!2sSreemangal!5e0!3m2!1sen!2sbd!4v1711382400000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-xl"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                <FaMapMarkerAlt className="text-indigo-600 mr-2" />
                Our Headquarters
              </h3>
              <p className="text-gray-600">
                Sreemangal, Moulvibazar, Bangladesh.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 placeholder-gray-400 transition-all`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
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
                        errors.email ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 placeholder-gray-400 transition-all`}
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    {...register("phone", {
                      pattern: {
                        value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
                        message: "Invalid phone number",
                      },
                    })}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 placeholder-gray-400 transition-all`}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Message *
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3">
                    <FaComment className="text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    rows="6"
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                    })}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 placeholder-gray-400 transition-all`}
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <FaPaperPlane />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section: Full Width Contact Info */}
      <div className="bg-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Location */}
            <div className="text-center">
              <div className="bg-indigo-800 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaBuilding className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Office</h3>
              <p className="text-indigo-200">Sreemangal</p>
              <p className="text-indigo-200">Moulvibazar</p>
              <p className="text-indigo-200">Bangladesh</p>
            </div>

            {/* Contact */}
            <div className="text-center">
              <div className="bg-indigo-800 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MdSupportAgent className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
              <p className="text-indigo-200">+88 01742772705</p>
              <p className="text-indigo-200">+88 01792150202</p>
              <p className="text-indigo-200">(Toll-free)</p>
            </div>

            {/* Email */}
            <div className="text-center">
              <div className="bg-indigo-800 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MdEmail className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-indigo-200">ruhitinfo@gmail.com</p>
              <p className="text-indigo-200">ruhitbaidya01@gmail.com</p>
            </div>
          </div>

          {/* Hours */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-indigo-800 px-6 py-3 rounded-full">
              <FaClock className="mr-2" />
              <span>Monday - Friday: 9:00 AM - 6:00 PM EST</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
