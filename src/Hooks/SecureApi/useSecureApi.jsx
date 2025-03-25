import axios from "axios";
import useUserContext from "../UserContext/useUserContext";

const secureApiCall = axios.create({
  baseURL: "http://localhost:5000",
});

const useSecureApi = () => {
  const { user } = useUserContext();
  const email = user.email;
  secureApiCall.interceptors.request.use(
    function (config) {
      const tokens = JSON.parse(localStorage.getItem("token"));
      config.headers.authorization = JSON.stringify(`berr ${email} ${tokens}`);
      return config;
    },
    function (err) {
      return Promise.reject(err);
    }
  );

  secureApiCall.interceptors.response.use(
    function (response) {
      return response;
    },
    function (err) {
      return Promise.reject(err);
    }
  );

  return secureApiCall;
};

export default useSecureApi;
