import axios from "axios";

const secureApiCall = axios.create({
  baseURL: "http://localhost:5000",
});

const useSecureApi = () => {
  secureApiCall.interceptors.request.use(
    function (config) {
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
